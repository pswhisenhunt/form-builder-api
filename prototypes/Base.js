var BaseSchema = require('../models/BaseSchema');

function Base(data) {
  this.name = data.hasOwnProperty('name') ? data.name.toString() : '';
  this.controls = data.hasOwnProperty('controls') ? data.controls : [];
  return this;
};

Base.prototype.getAll = function(callback) {
  BaseSchema.find(function(err, forms) {
    if (err) {
      callback(err);
    };
    callback(undefined, forms);
  });
};

Base.prototype.find = function(id, callback) {
  BaseSchema.findById(id, function(err, form) {
    if (err) {
      callback(err);
    };
    callback(undefined, form);
  });
};

Base.prototype.insert = function(callback) {
  var form = new BaseSchema(this);
  form.save(function(err, form) {
    if (err) {
      callback(err);
    };
    callback(undefined, form);
  });
};

Base.prototype.update = function(id, data, callback) {
  BaseSchema.findOneAndUpdate({_id: data._id},
    {'$set': {
      'name': data.name,
      'controls': data.controls
    }}, function(err) {
      if (err) {
        callback(err);
      };
      BaseSchema.find(data._id, function(err, form) {
        if (err) {
          callback(err);
        }
        callback(undefined, form);
    });
  });
};

Base.prototype.delete = function(id, callback) {
  BaseSchema.findByIdAndRemove(id, function(err) {
    if (err) {
      callback(err);
    };
    callback(undefined, {message: 'Successfully deleted form: ' + id});
  });
};

module.exports = Base;
