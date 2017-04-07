const express = require('express');
const session = require('express-session');
const massive = require('massive');
const bodyParser = require('body-parser');

const app = module.exports = express();
app.use(express.static(__dirname + './../public'))
app.listen(8000, function () {
  console.log('Listening on port 3000');
});
