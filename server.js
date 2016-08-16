var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var elementController = require('./controllers/element');

mongoose.connect('mongodb://localhost/form-builder');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.route('/elements')
  .post(elementController.create)
  .get(elementController.getAll);

router.route('/elements/:id')
  .put(elementController.update)
  .get(elementController.find)
  .delete(elementController.delete);

app.use('/api', router);
app.listen(port, function() {
  console.log('listening on port:', port);
});
