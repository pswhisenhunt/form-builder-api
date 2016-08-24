var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var FormControlController = require('./controllers/FormControl');
var FormBaseController = require('./controllers/FormBase');

mongoose.connect('mongodb://localhost/form-builder');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/control')
  .post(FormControlController.create)
  .get(FormControlController.getAll);

router.route('/control/:id')
  .put(FormControlController.update)
  .get(FormControlController.find)
  .delete(FormControlController.delete);

router.route('/form')
  .post(FormBaseController.create)
  .get(FormBaseController.getAll);

router.route('/form/:id')
  .put(FormBaseController.update)
  .get(FormBaseController.find)
  .delete(FormBaseController.delete);

app.use('/api', router);
app.listen(port, function() {
  console.log('listening on port:', port);
});
