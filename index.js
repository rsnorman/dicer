/*!
 * Dicer
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
};

/**
 */
var Dicer = function(radius, sectionHeight, sectionSpace) {
  this.getRadius = function getRadius() {
    return radius;
  };

  this.getSectionHeight = function getSectionHeight() {
    return sectionHeight;
  };

  this.getSectionSpace = function getSectionSpace() {
    return sectionSpace;
  };

  this.getSliceStartAngle = function getSliceStartAngle() {
    var halfSectionHeight, angleInRadians;
    halfSectionHeight = sectionHeight / 2;
    angleInRadians = Math.atan(halfSectionHeight / radius);
    return radiansToDegrees(angleInRadians);
  };

  this.getSliceStartPosition = function getSliceStartPosition() {
    return {
      y: sectionHeight / 2,
      x: Math.sqrt(Math.pow(radius, 2) - Math.pow(sectionHeight / 2, 2))
    };
  };

  this.getSliceEndAngle = function getSliceEndAngle() {
    var halfSectionHeight, angleInRadians;
    halfSectionHeight = sectionHeight / 2;
    angleInRadians = Math.atan(halfSectionHeight / radius);
    return 360 - radiansToDegrees(angleInRadians);
  };

  this.getSliceEndPosition = function getSliceEndPosition() {
    return {
      y: sectionHeight / -2,
      x: Math.sqrt(Math.pow(radius, 2) - Math.pow(sectionHeight / -2, 2))
    };
  };

  this.getSliceCenterAngle = function getSliceCenterAngle() {
    return this.getSliceStartAngle() - (this.getSliceAngle() / 2);
  };

  this.getSliceCenterPosition = function getSliceCenterPosition() {
    var centerAngle;
    centerAngle = this.getSliceCenterAngle();
    return {
      x: Math.cos(centerAngle) * radius,
      y: Math.sin(centerAngle) * radius
    };
  };

  this.getSliceAngle = function getSliceAngle() {
    var startAngle, endAngle, angle;
    startAngle = this.getSliceStartAngle();
    endAngle = this.getSliceEndAngle();
    angle = startAngle - endAngle;

    return signedMod(angle + 180, 360) - 180;
  };

  this.slice = function slice(numberOfSlices) {
    return [{
      startAngle: this.getSliceStartAngle(),
      centerAngle: this.getSliceCenterAngle(),
      endAngle:   this.getSliceEndAngle(),
      totalAngle: this.getSliceAngle(),
      startPosition: this.getSliceStartPosition(),
      centerPosition: this.getSliceCenterPosition(),
      endPosition: this.getSliceEndPosition()
    }];
  };

  function signedMod(number, otherNumber) {
    return number - Math.floor(number / otherNumber) * otherNumber;
  }
};

/**
 * Module exports
 * @public
 */
module.exports = Dicer;
