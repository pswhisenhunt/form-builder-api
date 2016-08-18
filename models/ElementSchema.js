var mongoose = require('mongoose');

var ElementSchema = new mongoose.Schema({
  name: String,
  type: String,
  options: [String],
  isCustom: Boolean,
  position: Number,
  form: String,
  htmlClass: String,
  htmlId: String
});

module.exports = mongoose.model('ElementSchema', ElementSchema);
