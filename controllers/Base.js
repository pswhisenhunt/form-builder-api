var Base = require('../prototypes/Base');
var handleErrors = require('../utils/handleErrors');

exports.create = function(req, res) {
  var base = new Base(req.body);
  base.insert(function(err, base) {
    if (err) {
      return res.send(err);
    } else {
      res.json(base);
    };
  });
};

exports.getAll = function(req, res) {
  Base.prototype.getAll(function(err, bases) {
    if (err) {
      return res.send(err);
    } else {
      res.json(bases);
    };
  });
};

exports.find = function(req, res) {
  var id = req.params.id;
  if (!id) {
    handleErrors(res, 400, 'Missing Id!');
  };
  Base.prototype.find(id, function(err, base) {
    if (err) {
      return res.send(err);
    } else {
      res.json(base);
    };
  });
};


exports.update = function(req, res) {
  var id = req.params.id;
  if (!id) {
    handleErrors(res, 400, 'Missing Id!');
  }
  Base.prototype.update(id, req.body, function(err, base) {
    if (err) {
      return res.send(err);
    } else {
      res.json(base);
    };
  });
};

exports.delete = function(req, res) {
  var id = req.params.id;
  if (!id) {
    handleErrors(res, 400, 'Missing Id!');
  }
  Base.prototype.delete(id, function(err, base) {
    if (err) {
      return res.send(err);
    } else {
      res.json(base);
    };
  });
};
