const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
});

module.exports = mongoose.model('Url', UrlSchema);
