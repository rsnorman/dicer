/*!
 * Dicer
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

/**
 */
var Dicer = function(radius, sectionHeight, sliceSpace) {
  this.getRadius = function getRadius() {
    return radius;
  };

  this.getSectionHeight = function getSectionHeight() {
    return sectionHeight;
  };

  this.getSliceSpace = function getSliceSpace() {
    return sliceSpace;
  };

  this.getSliceStartAngle = function getSliceStartAngle() {
    var halfSectionHeight, angleInRadians;
    halfSectionHeight = sectionHeight / 2;
    angleInRadians = Math.asin(halfSectionHeight / radius);
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
    angleInRadians = Math.asin(halfSectionHeight / radius);
    return 360 - radiansToDegrees(angleInRadians);
  };

  this.getSliceEndPosition = function getSliceEndPosition() {
    return {
      y: sectionHeight / -2,
      x: Math.sqrt(Math.pow(radius, 2) - Math.pow(sectionHeight / -2, 2))
    };
  };

  this.getSliceCenterAngle = function getSliceCenterAngle() {
    return getCenterAngle(this.getSliceStartAngle(), this.getSliceAngle());
  };

  this.getSliceCenterPosition = function getSliceCenterPosition() {
    return getPositionFromAngle(this.getSliceCenterAngle());
  };

  this.getSliceAngle = function getSliceAngle() {
    var startAngle, endAngle, angle;
    startAngle = this.getSliceStartAngle();
    endAngle = this.getSliceEndAngle();
    angle = startAngle - endAngle;

    return signedMod(angle + 180, 360) - 180;
  };

  this.slice = function slice(numberOfSlices) {
    var slices, sliceAngle, startAngle, endAngle,
      centerAngle, spaceAngle, totalSpaceAngle, _i;
    slices = [];

    if ( !!sliceSpace ) {
      spaceAngle  = getDegreesFromLength(sliceSpace, radius);
    } else {
      spaceAngle = 0
    }

    sliceAngle = (
      this.getSliceAngle() - (spaceAngle * (numberOfSlices - 1))
    ) / numberOfSlices;

    startAngle = this.getSliceStartAngle();

    for (_i = 0; _i < numberOfSlices; _i++) {
      startAngle  = startAngle < 0 ? 360 + startAngle : startAngle;
      endAngle    = startAngle - sliceAngle;
      endAngle    = endAngle < 0 ? 360 + endAngle : endAngle;
      centerAngle = getCenterAngle(startAngle, sliceAngle);
      centerAngle = centerAngle < 0 ? 360 + centerAngle : centerAngle;

      slices.push({
        startAngle:     startAngle,
        centerAngle:    centerAngle,
        endAngle:       endAngle,
        totalAngle:     sliceAngle,
        startPosition:  getPositionFromAngle(startAngle),
        centerPosition: getPositionFromAngle(centerAngle),
        endPosition:    getPositionFromAngle(endAngle)
      });

      startAngle -= sliceAngle + spaceAngle;
    }

    return slices;
  };

  function signedMod(number, otherNumber) {
    return number - Math.floor(number / otherNumber) * otherNumber;
  }

  function getCenterAngle(startAngle, totalAngle) {
    return startAngle - (totalAngle / 2);
  }

  function getPositionFromAngle(angle) {
    var radians = angle * Math.PI / 180;
    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius
    };
  }

  function radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  function getDegreesFromLength(length, radius) {
    var circumference;
    circumference = getCircumference(radius);

    return length * 360 / circumference;
  }

  function getCircumference(radius) {
    return 2 * Math.PI * radius;
  }
};

/**
 * Module exports
 * @public
 */
module.exports = Dicer;
