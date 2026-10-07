const mongoose = require('mongoose');


const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  tracks: [{ type: String }],
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }
});

module.exports = mongoose.model('Album', albumSchema);