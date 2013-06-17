// Generated by CoffeeScript 1.3.3
(function() {
  var assert, stepDefinitions;

  assert = require('assert');

  stepDefinitions = function() {
    this.World = require('../support/world').World;
    this.Given(/^I am on the home page$/, function(callback) {
      return this.visit('', callback);
    });
    return this.Then(/^I should see "([^"]*)" in "([^"]*)"$/, function(text, selector, callback) {
      assert.equal(text, this.browser.text(selector));
      return callback();
    });
  };

  module.exports = stepDefinitions;

}).call(this);