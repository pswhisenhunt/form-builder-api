var mongoose = require('mongoose');

var FormControlSchema = new mongoose.Schema({
  name: String,
  type: String,
  options: [String],
  isCustom: Boolean,
  position: Number,
  form: String,
  htmlClass: String,
  htmlId: String
});

module.exports = mongoose.model('FormControl', FormControlSchema);
