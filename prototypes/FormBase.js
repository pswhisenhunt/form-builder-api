var FormSchema = require('../models/FormSchema');

function FormBase(data) {
  this.name = data.name.toString() || '';
  this.formControls = data.formControls || [];
  return this;
};

FormBase.prototype.getAll = function(callback) {
  FormSchema.find(function(err, forms) {
    if (err) {
      callback(err);
    };
    callback(undefined, forms);
  });
};

FormBase.prototype.find = function(id, callback) {
  FormSchema.findById(id, function(err, form) {
    if (err) {
      callback(err);
    };
    callback(undefined, form);
  });
};

FormBase.prototype.insert = function(callback) {
  var form = new FormSchema(this);
  form.save(function(err, form) {
    if (err) {
      callback(err);
    };
    callback(undefined, form);
  });
};

FormBase.prototype.update = function(id, data, callback) {
  FormSchema.findOneAndUpdate({_id: id}, data, {new:true}, function(err, form) {
    if (err) {
      callback(err);
    };
    callback(undefined, form);
  });
};

FormBase.prototype.delete = function(id, callback) {
  FormSchema.findByIdAndRemove(id, function(err) {
    if (err) {
      callback(err);
    };
    callback(undefined, {message: 'Successfully deleted form: ' + id});
  });
};

FormBase.prototype.getFormControls = function() {

};

module.exports = FormBase;
