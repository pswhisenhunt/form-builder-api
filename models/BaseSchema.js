var mongoose = require('mongoose');

var BaseSchema = new mongoose.Schema({
  name: String,
  controls: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Base', BaseSchema);
