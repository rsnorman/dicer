/*!
 * Dicer
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var HALF_CIRCLE_DEGREES = require('./constants').HALF_CIRCLE_DEGREES;

var SlicePosition = function(circle, slice) {

  this.getStartPosition = function getStartPosition() {
    return getPositionFromAngle(slice.getStartAngle());
  };

  this.getCenterPosition = function getCenterPosition() {
    return getPositionFromAngle(slice.getCenterAngle());
  };

  this.getEndPosition = function getEndPosition() {
    return getPositionFromAngle(slice.getEndAngle());
  };

  function getPositionFromAngle(angle) {
    var radians = angle * Math.PI / HALF_CIRCLE_DEGREES;
    return {
      x: Math.cos(radians) * circle.getRadius(),
      y: Math.sin(radians) * circle.getRadius()
    };
  }
};

module.exports = SlicePosition;
