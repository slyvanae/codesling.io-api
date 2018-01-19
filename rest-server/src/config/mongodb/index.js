const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codesling');

var db = mongoose.connection;

let topScoreSchema = new mongoose.Schema({
  challengeId: {type: Number, require: true},
  contents: { type: Object, required: true },
  email: { type: String, required: true },
  time: { type: Number, required: true },
});

const topScores = mongoose.model('topScores', topScoreSchema);

export default topScores;