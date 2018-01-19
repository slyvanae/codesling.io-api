const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codesling-topScores');

var db = mongoose.connection;

let topScoreSchema = new Schema({
  _id: { type: Number, unique: true },
  contents: { type: Object, required: true }, 
  challengeId: {type: Number, require: true}
});

let topScores = mongoose.model('topScores', topScoreSchema);