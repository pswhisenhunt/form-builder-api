var Element = require('../prototypes/Element');

exports.create = function(req, res) {
  var element = new Element(req.body);
  element.insert(function(err, element) {
    if (err) {
      return res.send(err);
    } else {
      res.json(element);
    };
  });
};

exports.getAll = function(req, res) {
  Element.prototype.getAll(function(err, elements) {
    if (err) {
      return res.send(err);
    } else {
      res.json(elements);
    };
  });
};

exports.find = function(req, res) {
  var id = req.params.id;
  if (!id) {
    return new Error('Must have an id to locate element in database');
  };
  Element.prototype.find(id, function(err, element) {
    if (err) {
      return res.send(err);
    } else {
      res.json(element);
    };
  });
};


exports.update = function(req, res) {
  var id = req.params.id;
  if (!id) {
    return new Error('Must have the element\'s id in order to update it in the database.');
  }
  Element.prototype.update(id, req.body, function(err, element) {
    if (err) {
      return res.send(err);
    } else {
      res.json(element);
    };
  });
};

exports.delete = function(req, res) {
  var id = req.params.id;
  if (!id) {
    return new Error('Must have the element\'s id in order to delete it from the database');
  }
  Element.prototype.delete(id, function(err, element) {
    if (err) {
      return res.send(err);
    } else {
      res.json(element);
    };
  });
};
