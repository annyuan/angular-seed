// Generated by CoffeeScript 1.3.3
(function() {
  'use strict';

  /*
  Demonstrate how to register services
  In this case it is a simple value service
  */

  this.angular.module('myApp.services', [])
    .value('version', '0.1')
    .service('BC', [ function() {
      var data = {
        "width": "625",
        "height": "375",
        "playerID": "2125048399001",
        "playerKey": "AQ~~,AAABJMwIIBk~,RDHV1F-BfRVlRnDJBLoGGLSZ01iVTfqm",
      };
      return {
        data: data
      }
    }]);


}).call(this);

