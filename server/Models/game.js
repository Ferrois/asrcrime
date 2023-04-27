const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
  game: {
    type: String,
  },
  gamename: {
    type: String,
  },
  passcode: {
    type: String,
  }
});

module.exports = mongoose.model("game", GameSchema);
