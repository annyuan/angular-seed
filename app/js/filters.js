// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  this.angular.module('myApp.filters', [])
  .filter('interpolate', [
    'version', function(version) {
      return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
    }
  ])
  .filter('no_spaces', function() {
    return function(input) {
      return input.replace(/ /g,"_").toLowerCase();
    }
  });

}).call(this);
