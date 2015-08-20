/*!
 * Dicer
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

/**
 */
var Dicer = function(radius, sectionHeight, sliceSpace, direction) {
  var DEFAULT_DIRECTION, TOTAL_CIRCLE_DEGREES, HALF_CIRCLE_DEGREES;
  DEFAULT_DIRECTION    = 'left';
  TOTAL_CIRCLE_DEGREES = 360;
  HALF_CIRCLE_DEGREES  = 180;

  direction = direction || DEFAULT_DIRECTION;

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
    return getAngleFromSides(halfSectionHeight, radius, direction);
  };

  this.getSliceStartPosition = function getSliceStartPosition() {
    return {
      y: sectionHeight / 2,
      x: getXPosition(sectionHeight / 2, radius, direction)
    };
  };

  this.getSliceEndAngle = function getSliceEndAngle() {
    var halfSectionHeight, angleInRadians;
    halfSectionHeight = sectionHeight / 2;
    return TOTAL_CIRCLE_DEGREES -
      getAngleFromSides(halfSectionHeight, radius, direction);
  };

  this.getSliceEndPosition = function getSliceEndPosition() {
    return {
      y: sectionHeight / -2,
      x: getXPosition(sectionHeight / 2, radius, direction)
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
    endAngle   = this.getSliceEndAngle();
    angle      = startAngle - endAngle;

    return signedMod(
      angle + HALF_CIRCLE_DEGREES, TOTAL_CIRCLE_DEGREES
    ) - HALF_CIRCLE_DEGREES;
  };

  this.slice = function slice(numberOfSlices) {
    var slices, sliceAngle, startAngle, spaceAngle, _i;

    slices     = [];
    spaceAngle = getSpaceAngle(sliceSpace, radius, direction);
    sliceAngle = getSliceAngle(
      this.getSliceAngle(), numberOfSlices, spaceAngle
    );

    startAngle = this.getSliceStartAngle();
    for (_i = 0; _i < numberOfSlices; _i++) {
      slices.push(buildSlice(startAngle, sliceAngle));
      startAngle -= sliceAngle + spaceAngle;
    }

    return slices;
  };

  function buildSlice(startAngle, sliceAngle) {
    var endAngle, centerAngle;
    endAngle    = startAngle - sliceAngle;
    centerAngle = getCenterAngle(startAngle, sliceAngle);

    return {
      startAngle:     absAngle(startAngle),
      centerAngle:    absAngle(centerAngle),
      endAngle:       absAngle(endAngle),
      totalAngle:     Math.abs(sliceAngle),
      startPosition:  getPositionFromAngle(startAngle),
      centerPosition: getPositionFromAngle(centerAngle),
      endPosition:    getPositionFromAngle(endAngle)
    };
  }

  function getSliceAngle(fullSliceAngle, numberOfSlices, spaceAngle) {
    var totalSpaceAngle;
    totalSpaceAngle = spaceAngle * (numberOfSlices - 1);
    return (fullSliceAngle - totalSpaceAngle) / numberOfSlices;
  }

  function getSpaceAngle(sliceSpace, radius, direction) {
    var spaceDegrees;
    spaceDegrees = getDegreesFromLength(sliceSpace || 0, radius);
    if ( direction !== DEFAULT_DIRECTION ) {
      spaceDegrees = spaceDegrees * -1;
    }

    return spaceDegrees;
  }

  function signedMod(number, otherNumber) {
    return number - Math.floor(number / otherNumber) * otherNumber;
  }

  function getCenterAngle(startAngle, totalAngle) {
    return startAngle - (totalAngle / 2);
  }

  function absAngle(angle) {
    return angle < 0 ? TOTAL_CIRCLE_DEGREES + angle : angle;
  }

  function getPositionFromAngle(angle) {
    var radians = angle * Math.PI / HALF_CIRCLE_DEGREES;
    return {
      x: Math.cos(radians) * radius,
      y: Math.sin(radians) * radius
    };
  }

  function radiansToDegrees(radians) {
    return radians * HALF_CIRCLE_DEGREES / Math.PI;
  }

  function getDegreesFromLength(length, radius) {
    var circumference;
    circumference = getCircumference(radius);

    return length * TOTAL_CIRCLE_DEGREES / circumference;
  }

  function getCircumference(radius) {
    return 2 * Math.PI * radius;
  }

  function getAngleFromSides(oppositeSide, hypotenuse, direction) {
    var angleInRadians;
    angleInRadians = Math.asin(oppositeSide / hypotenuse);

    if ( direction !== DEFAULT_DIRECTION ) {
      angleInRadians = Math.PI - angleInRadians;
    }

    return radiansToDegrees(angleInRadians);
  }

  function getXPosition(side, hypotenuse, direction) {
    var xPos;
    xPos = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(side, 2));

    if ( direction !== DEFAULT_DIRECTION ) {
      xPos = xPos * -1;
    }

    return xPos;
  }
};

/**
 * Module exports
 * @public
 */
module.exports = Dicer;
