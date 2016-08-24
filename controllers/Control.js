var Control = require('../prototypes/Control');

exports.create = function(req, res) {
  var control = new Control(req.body);
  control.insert(function(err, control) {
    if (err) {
      return res.send(err);
    } else {
      res.json(control);
    };
  });
};

exports.getAll = function(req, res) {
  Control.prototype.getAll(function(err, controls) {
    if (err) {
      return res.send(err);
    } else {
      res.json(controls);
    };
  });
};

exports.find = function(req, res) {
  var id = req.params.id;
  if (!id) {
    return new Error('Must have an id to locate FormControl in database');
  };
  Control.prototype.find(id, function(err, control) {
    if (err) {
      return res.send(err);
    } else {
      res.json(control);
    };
  });
};


exports.update = function(req, res) {
  var id = req.params.id;
  if (!id) {
    return new Error('Must have the FormControl\'s id in order to update it in the database.');
  }
  Control.prototype.update(id, req.body, function(err, control) {
    if (err) {
      return res.send(err);
    } else {
      res.json(control);
    };
  });
};

exports.delete = function(req, res) {
  var id = req.params.id;
  if (!id) {
    return new Error('Must have the FormControl\'s id in order to delete it from the database');
  }
  Control.prototype.delete(id, function(err, control) {
    if (err) {
      return res.send(err);
    } else {
      res.json(control);
    };
  });
};
