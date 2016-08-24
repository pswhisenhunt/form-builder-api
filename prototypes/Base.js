var BaseSchema = require('../models/BaseSchema');

function Base(data) {
  this.name = data.name.toString() || '';
  this.controls = data.controls || [];
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
  BaseSchema.findOneAndUpdate({_id: id}, data, {new:true}, function(err, form) {
    if (err) {
      callback(err);
    };
    callback(undefined, form);
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

Base.prototype.getFormControls = function() {

};

module.exports = Base;
