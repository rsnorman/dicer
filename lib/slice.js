/*!
 * Dicer
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var TOTAL_CIRCLE_DEGREES = require('./constants').TOTAL_CIRCLE_DEGREES;

var Slice = function(totalAngle, options) {
  var startAngle;

  options = options || {
    startAngle: 0
  };
  startAngle = options.startAngle;

  this.getStartAngle = function() {
    return absAngle(startAngle);
  };

  this.getCenterAngle = function() {
    return absAngle(startAngle - (totalAngle / 2));
  };

  this.getEndAngle = function() {
    return absAngle(startAngle - totalAngle);
  };

  this.getTotalAngle = function() {
    return totalAngle;
  };

  function absAngle(angle) {
    return angle < 0 ? TOTAL_CIRCLE_DEGREES + angle : angle;
  }
};

module.exports = Slice;
