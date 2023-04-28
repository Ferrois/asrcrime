require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const dbURI = process.env.dbURI;
const server = require("http").createServer(app);
const io_main = require("socket.io")(server, { cors: { origin: "*" } });
const metadata = require("./metadata");
const GroupSchema = require("./Models/group");
const GameSchema = require("./Models/game");
const ChatSchema = require("./Models/chat");

// io_chat.use(require("./Helper/authenticateToken").verifyToken);

//Connect to MongoDB
mongoose.connect(`${dbURI}`).then((response) => {
  console.log("Connected to MongoDB. Link: " + response.connection.host);
});

//Chat Socket
io_main.on("connection", (socket) => {
  socket.emit("alert", { message: "Connected To Server! Welcome to ASR Crime!", type: "success" });
  console.log("Socket Connected: " + socket.id);

  socket.on("login", async (data) => {
    // await GroupSchema.create({
    //   group: "7",
    //   passcode: "CPU64",
    //   games: {
    //     "1": {  score: 0 },
    //     "2": {  score: 0 },
    //     "3": {  score: 0 },
    //     "4": {  score: 0 },
    //     "5": {  score: 0 },
    //     "6": {  score: 0 },
    //     "7": {  score: 0 },
    //   },
    //   clues: [
    //     {
    //       disc: "Wow! He/She won something at SSEF...",
    //       tf: "true",
    //       score: 10,
    //     },
    //     {
    //       disc: "All of them couldve used Chinese to converse with one another",
    //       tf: "false",
    //       score: 25,
    //     },
    //     {
    //       disc: "Wait... Ive seen him on @asr.stem!",
    //       tf: "true",
    //       score: 40
    //     },
    //     {
    //       disc: "Atleast one of the culprits retained for a year in JC",
    //       tf: "false",
    //       score: 55
    //     },
    //     {
    //       disc: "He/She is the Head of something...",
    //       tf: "true",
    //       score: 75
    //     },
    //     {
    //       disc: "One of the culprits is a 4H2 student!",
    //       tf: "false",
    //       score : 100
    //     },
    //     {
    //       disc: "2 of them are either Exco or Head",
    //       tf: "false",
    //       score: 125
    //     }
    //   ]
    // })
    try {
      const selectedGroup = await GroupSchema.findOne({ passcode: data.payload });
      if (!selectedGroup) return socket.emit("alert", { message: "Wrong Passcode!", type: "error" });
      socket.emit("unlocked", { unlocked: true, code: data.payload, group: selectedGroup.group });
      socket.emit("alert", { message: "Welcome Detectives #" + selectedGroup.group + ".", type: "success" });
    } catch (error) {
      socket.emit("alert", { message: "Unable to Authenticate!", type: "error" });
    }
  });
  socket.on("getscore", async ({ payload, token }) => {
    try {
      const selectedGroup = await GroupSchema.findOne({ passcode: token });
      if (!selectedGroup) {
        socket.emit("alert", { message: "Unable to Authenticate!", type: "error" });
        return socket.emit("locked");
      }

      const response = [];
      for (let i = 0; i < Object.keys(selectedGroup.games).length; i++) {
        const game = Object.keys(selectedGroup.games)[i];
        const { score } = selectedGroup.games[game];
        response.push({ game, score });
      }

      const totalScore = Object.values(selectedGroup.games).reduce((a, b) => parseInt(a) + parseInt(b.score), 0);
      socket.emit("updatescore", { list: response, totalScore });
    } catch {
      socket.emit("alert", { message: "Internal error! Ferrois has skill issue", type: "error" });
    }
  });

  socket.on("admin-login", async ({ payload }) => {
    try {
      const selectedGame = await GameSchema.findOne({ passcode: payload });
      if (!selectedGame) return socket.emit("alert", { message: "Wrong Passcode!", type: "error" });
      socket.emit("admin-unlocked", { unlocked: true, code: payload, game: selectedGame.game, gamename: selectedGame.gamename });
      socket.emit("alert", { message: "Welcome Gamemaster #" + selectedGame.game + ".", type: "success" });
    } catch {
      socket.emit("alert", { message: "Internal Error", type: "error" });
    }
  });

  socket.on("admin-request", async ({ payload, token }) => {
    console.log(token, "fa");
    try {
      const selectedGame = await GameSchema.findOne({ passcode: token });
      // console.log(selectedGame)
      if (!selectedGame) {
        return socket.emit("alert", { message: "Fetching Information!", type: "info" });
      }
      const allTeams = await GroupSchema.find();
      const response = [];
      for (let i = 0; i < allTeams.length; i++) {
        const group = allTeams[i].group;
        const { score } = allTeams[i].games[selectedGame.game];
        response.push({ group, score });
      }

      socket.emit("admin-response", response);
    } catch {
      socket.emit("alert", { message: "Internal Error", type: "error" });
    }
  });

  socket.on("admin-modify-score", async ({ payload: { group, score }, token }) => {
    try {
      if (score > 20) return socket.emit("alert", { message: "Score cannot be greater than 20!", type: "error" });
      if (score < 0) return socket.emit("alert", { message: "Score cannot be less than 0!", type: "error" });
      if (!Number.isInteger(parseInt(score)))
        return socket.emit("alert", { message: "Score must be an integer!", type: "error" });
      try {
        const selectedGame = await GameSchema.findOne({ passcode: token });
        const selectedGroup = await GroupSchema.findOne({ group: group });
        selectedGroup.games[selectedGame.game].score = score;
        const savedGroup = await GroupSchema.findOneAndUpdate({ group: group }, selectedGroup);
        socket.emit("alert", { message: "Score Updated!", type: "success" });
        socket.emit("relay", "admin-request");
      } catch (err) {
        console.log(err);
        socket.emit("alert", { message: "Unable to update score! Internal Server Error 500", type: "error" });
      }
    } catch {
      socket.emit("alert", { message: "Internal Error", type: "error" });
    }
  });

  socket.on("getclues", async ({ payload, token }) => {
    try {
      const selectedGroup = await GroupSchema.findOne({ passcode: token });
      const totalScore = Object.values(selectedGroup.games).reduce((a, b) => parseInt(a) + parseInt(b.score), 0);
      const clues = selectedGroup.clues;
      const response = [];
      for (let i = 0; i < clues.length; i++) {
        if (clues[i].score > totalScore) {
          clues[i].tf = "Unknown";
          response.push(clues[i]);
        } else {
          response.push(clues[i]);
        }
      }
      socket.emit("updateclues", response);
    } catch {
      socket.emit("alert", { message: "Internal Error", type: "error" });
    }
  });

  socket.on("joinchat", async ({ payload, token }) => {
    try {
      socket.join("chat");
      const chats = await ChatSchema.find().limit(50);
      socket.emit("updatechat", chats);
    } catch {
      socket.emit("alert", { message: "Unable to join chat! Internal Server Error 500", type: "error" });
    }
  });
  socket.on("sendchat", async ({ payload, token }) => {
    try {
      if (payload.length > 200)
        return socket.emit("alert", { message: "Message too long! Keep it within 200 characters", type: "error" });
      const selectedGroup = await GroupSchema.findOne({ passcode: token });
      await ChatSchema.create({ group: selectedGroup.group, message: payload });
      socket.to("chat").emit("incomingchat", [{ group: selectedGroup.group, message: payload }]);
    } catch {
      socket.emit("alert", { message: "Unable to send message! Internal Server Error 500", type: "error" });
    }
  });
  socket.on("leavechat", async ({ payload, token }) => {
    socket.leave("chat");
  });

  socket.on("adminview-request", async ({ payload, token }) => {
    const teams = await GroupSchema.find();
    const response = [];
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      const { group, games } = team;
      const totalScore = Object.values(games).reduce((a, b) => parseInt(a) + parseInt(b.score), 0);
      response.push({ group, games, totalScore });
    }
    socket.emit("adminview-response", response);
  });
});

//Listen on the port
server.listen(port, function () {
  console.log("Server started on port " + port);
});
