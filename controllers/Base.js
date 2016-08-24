var Base = require('../prototypes/Base');

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
    return new Error('Must have an id to locate Base in database');
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
    return new Error('Must have the Base\'s id in order to update it in the database.');
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
    return new Error('Must have the Base\'s id in order to delete it from the database');
  }
  Base.prototype.delete(id, function(err, base) {
    if (err) {
      return res.send(err);
    } else {
      res.json(base);
    };
  });
};
