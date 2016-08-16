var mongoose = require('mongoose');

var ElementSchema = new mongoose.Schema({
  name: String,
  type: String,
  values: [String],
  htmlClass: String,
  htmlId: String
});

module.exports = mongoose.model('ElementSchema', ElementSchema);
