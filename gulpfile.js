var gulp = require('gulp'),
  gulpUtil = require('gulp-util'),
  gulpIf = require('gulp-if'),
  streamify = require('gulp-streamify'),
  autoprefixer = require('gulp-autoprefixer'),
  cssmin = require('gulp-cssmin'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  source = require('vinyl-source-stream'),
  babelify = require('babelify'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  uglify = require('gulp-uglify');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'underscore'
];

