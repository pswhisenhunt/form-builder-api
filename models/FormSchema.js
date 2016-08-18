var mongoose = require('mongoose');

var FormSchema = new mongoose.Schema({
  name: String,
  formControls: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Form', FormSchema);
