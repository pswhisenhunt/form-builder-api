var Element = require('../prototypes/Element');

exports.create = function(req, res) {
  var element = new Element(req.body);
  element.insert(function(err, doc) {
    if (err) {
      return res.send(err);
    } else {
      res.json(doc);
    };
  });
};

exports.all = function(req, res) {
  Element.prototype.all(function(err, docs) {
    if (err) {
      return res.send(err);
    } else {
      res.json(docs);
    };
  });
};

exports.find = function(req, res) {
  var id = req.params.id || '';
  if (!id) {
    return new Error('Must have an id to locate element in database');
  };
  Element.prototype.find(id, function(err, doc) {
    if (err) {
      return res.send(err);
    } else {
      res.json(doc);
    };
  });
};


exports.update = function(req, res) {
  var id = req.params.id || '';
  if (!id) {
    return new Error('Must have the element\'s id in order to update it in the database.');
  }
  Element.prototype.update(id, req.body, function(err, doc) {
    if (err) {
      return res.send(err);
    } else {
      res.json(doc);
    };
  });
};

exports.delete = function(req, res) {
  var id = req.params.id || '';
  if (!id) {
    return new Error('Must have the element\'s id in order to delete it from the database');
  }
  Element.prototype.delete(id, function(err, doc) {
    if (err) {
      return res.send(err);
    } else {
      res.json(doc);
    };
  });
};
