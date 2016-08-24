var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var ControlController = require('./controllers/Control');
var BaseController = require('./controllers/Base');

mongoose.connect('mongodb://localhost/form-builder');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/control')
  .post(ControlController.create)
  .get(ControlController.getAll);

router.route('/control/:id')
  .put(ControlController.update)
  .get(ControlController.find)
  .delete(ControlController.delete);

router.route('/form')
  .post(BaseController.create)
  .get(BaseController.getAll);

router.route('/form/:id')
  .put(BaseController.update)
  .get(BaseController.find)
  .delete(BaseController.delete);

app.use('/api', router);
app.listen(port, function() {
  console.log('listening on port:', port);
});
