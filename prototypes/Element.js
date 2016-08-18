var formatArray = require('../utils/formatArray');
var ElementSchema = require('../models/ElementSchema');

function Element(data) {
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

Element.prototype.transformRequest = function(data) {
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

Element.prototype.insert = function(callback) {
  var doc = new ElementSchema(this);
  doc.save(function(err, element) {
    if (err) {
      callback(err);
    }
    callback(undefined, element)
  });
}

Element.prototype.update = function(id, data, callback) {
  ElementSchema.findOneAndUpdate({_id: id}, data, {new: true}, function(err, element){
    if (err) {
      callback(err)
    };
    callback(undefined, element);
  });
};

Element.prototype.getAll = function(callback) {
  ElementSchema.find(function(err, elements) {
    if (err) {
      callback(err);
    }
    callback(undefined, elements);
  });
};

Element.prototype.delete = function(id, callback) {
  ElementSchema.findByIdAndRemove(id, function(err) {
    if (err) {
      callback(err);
    };
    callback(undefined, {message: 'Successfully deleted element: ' + id});
  });
};

Element.prototype.find = function(id, callback) {
  ElementSchema.findById(id, function(err, element) {
    if (err) {
      callback(err);
    }
    callback(undefined, element)
  });
};


module.exports = Element;
