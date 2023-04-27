const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
  group: {
    type: String,
  },
  message:{
    type: String,
  }
});

module.exports = mongoose.model("chat", ChatSchema);
