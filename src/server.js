require('babel-register')

var path = require('path'),
  express = require('express'),
  bodyParse = require('body-parse'),
  compression = require('compression'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  async = require('async'),
  colors = require('colors'),
  mongoose = require('mongoose'),
  request = require('request'),
  React = require('react'),
  ReactDom = require('react-dom/server'),
  Router = require('react-router'),
  swig = require('swig'),
  xml2js = require('xml2js'),
  _ = require('underscore');

var app = express();

mongoose.connect(settings.database);
mongoose.connect.on('err', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
})

app.set('port', process.env.PORT || 80);

app.use(compression());

app.use(logger('dev'));

app.use(bodyParse.json());

app.use(bodyParse.urlencoded({extended: false}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));