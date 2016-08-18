var formatArray = require('../utils/formatArray');
var FormControlSchema = require('../models/FormControlSchema');

function FormControl(data) {
  var defaults = {
    name: '',
    type: '',
    options: [],
    position: 0,
    form: '',
    isCustom: false,
    htmlClass: '',
    htmlId: ''
  };
  data =  data ? this.transformRequest(data) : defaults;
  this.name = data.name;
  this.type = data.type;
  this.options = data.options;
  this.form = data.form;
  this.position = data.position;
  this.isCustom = data.isCustom;
  this.htmlClass = data.htmlClass;
  this.htmlId = data.htmlId;
  return this;
};

FormControl.prototype.transformRequest = function(data) {
  return {
    name: data.hasOwnProperty('name') ? data.name.toString() : '',
    type: data.hasOwnProperty('type') ? data.type.toString() : '',
    options: data.hasOwnProperty('options') ? formatArray.transformToArrayOfStrings(data.options) : [],
    form: data.hasOwnProperty('form') ? data.form.toString() : '',
    isCustom: data.hasOwnProperty('isCustom') ? data.isCustom : false,
    position: data.hasOwnProperty('position') ? Number(data.position) : 0,
    htmlClass: data.hasOwnProperty('htmlClass') ? data.htmlClass.toString() : '',
    htmlId: data.hasOwnProperty('htmlId') ? data.htmlId.toString() : ''
  };
};

FormControl.prototype.insert = function(callback) {
  var doc = new FormControlSchema(this);
  doc.save(function(err, formControl) {
    if (err) {
      callback(err);
    }
    callback(undefined, formControl)
  });
}

FormControl.prototype.update = function(id, data, callback) {
  FormControlSchema.findOneAndUpdate({_id: id}, data, {new: true}, function(err, formControl){
    if (err) {
      callback(err)
    };
    callback(undefined, formControl);
  });
};

FormControl.prototype.getAll = function(callback) {
  FormControlSchema.find(function(err, formControls) {
    if (err) {
      callback(err);
    }
    callback(undefined, formControls);
  });
};

FormControl.prototype.delete = function(id, callback) {
  FormControlSchema.findByIdAndRemove(id, function(err) {
    if (err) {
      callback(err);
    };
    callback(undefined, {message: 'Successfully deleted FormControl: ' + id});
  });
};

FormControl.prototype.find = function(id, callback) {
  FormControlSchema.findById(id, function(err, formControl) {
    if (err) {
      callback(err);
    }
    callback(undefined, formControl)
  });
};


module.exports = FormControl;
