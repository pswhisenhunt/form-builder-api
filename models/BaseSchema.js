var mongoose = require('mongoose');
var ControlSchema = require('./ControlSchema');

var BaseSchema = new mongoose.Schema({
  name: String,
  controls : [mongoose.Schema.Types.Mixed]
});

module.exports = mongoose.model('Base', BaseSchema);
