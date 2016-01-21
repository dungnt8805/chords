require('babel-register')

var path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
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
  _ = require('underscore'),
  settings = require('./conf/settings');

var app = express();

mongoose.connect(settings.database);
mongoose.connection.on('err', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
})

app.set('port', process.env.PORT || 8080);

app.use(compression());

app.use(logger('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(express.static(path.join(__dirname, 'public')));