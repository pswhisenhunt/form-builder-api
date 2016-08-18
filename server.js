var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var FormControlController = require('./controllers/FormControl');

mongoose.connect('mongodb://localhost/form-builder');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.route('/FormControls')
  .post(FormControlController.create)
  .get(FormControlController.getAll);

router.route('/FormControls/:id')
  .put(FormControlController.update)
  .get(FormControlController.find)
  .delete(FormControlController.delete);

app.use('/api', router);
app.listen(port, function() {
  console.log('listening on port:', port);
});
