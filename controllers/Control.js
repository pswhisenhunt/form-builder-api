var Control = require('../prototypes/Control');
var handleErrors = require('../utils/handleErrors');

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
    handleErrors(res, 400, 'Missing Id!');
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
    handleErrors(res, 400, 'Missing Id!');
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
    handleErrors(res, 400, 'Missing Id!');
  }
  Control.prototype.delete(id, function(err, control) {
    if (err) {
      return res.send(err);
    } else {
      res.json(control);
    };
  });
};
