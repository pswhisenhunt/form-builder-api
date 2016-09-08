var formatArray = require('../utils/formatArray');
var ControlSchema = require('../models/ControlSchema');

function Control(data) {
  var defaults = {
    name: '',
    type: '',
    options: [],
    position: 0,
    isCustom: false,
    htmlClass: '',
    htmlId: ''
  };
  data =  data ? this.transformRequest(data) : defaults;
  this.name = data.name;
  this.type = data.type;
  this.options = data.options;
  this.position = data.position;
  this.isCustom = data.isCustom;
  this.htmlClass = data.htmlClass;
  this.htmlId = data.htmlId;
  return this;
};

Control.prototype.transformRequest = function(data) {
  return {
    name: data.hasOwnProperty('name') ? data.name.toString() : '',
    type: data.hasOwnProperty('type') ? data.type.toString() : '',
    options: data.hasOwnProperty('options') ? formatArray.transformToArrayOfStrings(data.options) : [],
    isCustom: data.hasOwnProperty('isCustom') ? data.isCustom : false,
    position: data.hasOwnProperty('position') ? Number(data.position) : 0,
    htmlClass: data.hasOwnProperty('htmlClass') ? data.htmlClass.toString() : '',
    htmlId: data.hasOwnProperty('htmlId') ? data.htmlId.toString() : ''
  };
};

Control.prototype.insert = function(callback) {
  var doc = new ControlSchema(this);
  doc.save(function(err, formControl) {
    if (err) {
      callback(err);
    }
    callback(undefined, formControl)
  });
}

Control.prototype.update = function(id, data, callback) {
  ControlSchema.findOneAndUpdate({_id: id}, data, {new: true}, function(err, formControl){
    if (err) {
      callback(err)
    };
    callback(undefined, formControl);
  });
};

Control.prototype.getAll = function(callback) {
  ControlSchema.find(function(err, formControls) {
    if (err) {
      callback(err);
    }
    callback(undefined, formControls);
  });
};

Control.prototype.delete = function(id, callback) {
  ControlSchema.findByIdAndRemove(id, function(err) {
    if (err) {
      callback(err);
    };
    callback(undefined, {message: 'Successfully deleted Control: ' + id});
  });
};

Control.prototype.find = function(id, callback) {
  ControlSchema.findById(id, function(err, formControl) {
    if (err) {
      callback(err);
    }
    callback(undefined, formControl)
  });
};


module.exports = Control;
