/*!
 * Dicer
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var TOTAL_CIRCLE_DEGREES = require('./constants').TOTAL_CIRCLE_DEGREES;

var Circle = function(radius) {

  this.getRadius = function getRadius() {
    return radius;
  };

  this.getCircumference = function getCircumference() {
    return 2 * Math.PI * radius;
  };

  this.getDegreesFromArcLength = function getDegreesFromArcLength(length) {
    return length * TOTAL_CIRCLE_DEGREES / this.getCircumference();
  };

};

module.exports = Circle;
