require('dotenv').load();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport')
const jwt = require('express-jwt');
require('./back-end/config/passport');

const routesAuth = require('./back-end/routes/auth');
const routesApi = require('./back-end/routes/index');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front-end')));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.use('/sigin', routesAuth);
app.use('/api', jwt({
  secret: process.env.JWT_SECRET
}), routesApi);
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'front-end', 'index.html'));
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      message: 'Invalid token...'
    });
  }
});

module.exports = app;