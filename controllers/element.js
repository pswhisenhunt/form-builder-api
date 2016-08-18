var FormControl = require('../prototypes/FormControl');

exports.create = function(req, res) {
  var FormControl = new FormControl(req.body);
  FormControl.insert(function(err, FormControl) {
    if (err) {
      return res.send(err);
    } else {
      res.json(FormControl);
    };
  });
};

exports.getAll = function(req, res) {
  FormControl.prototype.getAll(function(err, FormControls) {
    if (err) {
      return res.send(err);
    } else {
      res.json(FormControls);
    };
  });
};

exports.find = function(req, res) {
  var id = req.params.id;
  if (!id) {
    return new Error('Must have an id to locate FormControl in database');
  };
  FormControl.prototype.find(id, function(err, FormControl) {
    if (err) {
      return res.send(err);
    } else {
      res.json(FormControl);
    };
  });
};


exports.update = function(req, res) {
  var id = req.params.id;
  if (!id) {
    return new Error('Must have the FormControl\'s id in order to update it in the database.');
  }
  FormControl.prototype.update(id, req.body, function(err, FormControl) {
    if (err) {
      return res.send(err);
    } else {
      res.json(FormControl);
    };
  });
};

exports.delete = function(req, res) {
  var id = req.params.id;
  if (!id) {
    return new Error('Must have the FormControl\'s id in order to delete it from the database');
  }
  FormControl.prototype.delete(id, function(err, FormControl) {
    if (err) {
      return res.send(err);
    } else {
      res.json(FormControl);
    };
  });
};
