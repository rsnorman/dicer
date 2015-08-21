/*!
 * Dicer
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var DEFAULT_DIRECTION    = require('./constants').DEFAULT_DIRECTION;
var TOTAL_CIRCLE_DEGREES = require('./constants').TOTAL_CIRCLE_DEGREES;
var HALF_CIRCLE_DEGREES  = require('./constants').HALF_CIRCLE_DEGREES;
var Slice                = require('./slice');

var SliceCreator = function(circle, direction) {

  this.fromSectionHeight = function fromSides(height) {
    var startAngle, endAngle, totalAngle;
    startAngle = getSliceStartAngle(height, circle.getRadius(), direction);
    endAngle   = getSliceEndAngle(height, circle.getRadius(), direction);
    totalAngle = getSliceTotalAngle(startAngle, endAngle);

    return new Slice(totalAngle, {
      startAngle: startAngle
    });
  },

  this.fromArcLength = function fromArcLength(length) {
    return new Slice(getTotalAngleFromLength(length, circle, direction));
  }
};

function getSliceStartAngle(sectionHeight, radius, direction) {
  var halfSectionHeight, angleInRadians;
  halfSectionHeight = sectionHeight / 2;
  return getAngleFromSides(halfSectionHeight, radius, direction);
}

function getSliceEndAngle(sectionHeight, radius, direction) {
  var halfSectionHeight, angleInRadians;
  halfSectionHeight = sectionHeight / 2;
  return TOTAL_CIRCLE_DEGREES -
    getAngleFromSides(halfSectionHeight, radius, direction);
}

function getSliceTotalAngle(startAngle, endAngle) {
  var angle;
  angle = startAngle - endAngle;

  return signedMod(
    angle + HALF_CIRCLE_DEGREES, TOTAL_CIRCLE_DEGREES
  ) - HALF_CIRCLE_DEGREES;
}

function getAngleFromSides(oppositeSide, hypotenuse, direction) {
  var angleInRadians;
  angleInRadians = Math.asin(oppositeSide / hypotenuse);

  if ( direction !== DEFAULT_DIRECTION ) {
    angleInRadians = Math.PI - angleInRadians;
  }

  return radiansToDegrees(angleInRadians);
}

function radiansToDegrees(radians) {
  return radians * HALF_CIRCLE_DEGREES / Math.PI;
}

function signedMod(number, otherNumber) {
  return number - Math.floor(number / otherNumber) * otherNumber;
}

function getTotalAngleFromLength(arcLength, circle, direction) {
  var totalDegrees;
  totalDegrees = circle.getDegreesFromArcLength(arcLength || 0);

  if ( direction !== DEFAULT_DIRECTION ) {
    totalDegrees = totalDegrees * -1;
  }

  return totalDegrees;
}

module.exports = SliceCreator;
