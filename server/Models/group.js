const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  group: {
    type: String,
  },
  passcode: {
    type: String,
  },
  //   games: {
  //     1: { score: "20" },
  //     2: { score: "20" },
  //     3: { score: "20" },
  //     4: { score: "20" },
  //     5: { score: "20" },
  //     6: { score: "20" },
  //     7: { score: "20" },
  //   },
  games: {
    type: Object,
  },
  clues:{
    type: Array,
  }
});

module.exports = mongoose.model("group", GroupSchema);
