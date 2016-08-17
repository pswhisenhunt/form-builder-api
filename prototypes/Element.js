var formatArray = require('../utils/formatArray');
var _ = require('underscore');
var ElementSchema = require('../models/ElementSchema');

function Element(data) {
  var defaults = {
    name: '',
    type: '',
    values: [],
    htmlClass: '',
    htmlId: ''
  };
  data =  data ? this.transformRequest(data) : defaults;
  this.name = data.name;
  this.type = data.type;
  this.values = data.values;
  this.htmlClass = data.htmlClass;
  this.htmlId = data.htmlId;
  return this;
};

Element.prototype.transformRequest = function(data) {
  return {
    name: data.hasOwnProperty('name') ? data.name.toString() : '',
    type: data.hasOwnProperty('type') ? data.type.toString() : '',
    values: data.hasOwnProperty('values') ? formatArray.transformToArrayOfStrings(data.values) : [],
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
