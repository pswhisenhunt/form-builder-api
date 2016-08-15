var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.listen(port, function() {
  console.log('listening on port:', port);
});
