require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var index = require('./back-end/routes/index');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front-end')));
app.use(express.static(path.join(__dirname, 'node-modules')));

app.get('/api/test/ads', (req, res) => {
  res.json({"abd": "deeeedd"})
})

//app.use('/', index);
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'front-end/dist/app', 'index.html'));
});

module.exports = app;