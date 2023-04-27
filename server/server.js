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
    }catch {
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
});

//Listen on the port
server.listen(port, function () {
  console.log("Server started on port " + port);
});
