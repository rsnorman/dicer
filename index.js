/*!
 * Dicer
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

/**
 */
var Dicer = function(radius, sectionHeight, sliceSpace, direction) {
  direction = direction || 'left';

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
    var halfSectionHeight, angleInRadians, hypotenuse;
    halfSectionHeight = sectionHeight / 2;
    angleInRadians = Math.asin(halfSectionHeight / radius);
    if ( direction === 'right' ) {
      angleInRadians = Math.PI - angleInRadians;
    }
    return radiansToDegrees(angleInRadians);
  };

  this.getSliceStartPosition = function getSliceStartPosition() {
    var xPos;
    xPos = Math.sqrt(Math.pow(radius, 2) - Math.pow(sectionHeight / 2, 2));

    if ( direction === 'right' ) {
      xPos = xPos * -1;
    }

    return {
      y: sectionHeight / 2,
      x: xPos
    };
  };

  this.getSliceEndAngle = function getSliceEndAngle() {
    var halfSectionHeight, angleInRadians;
    halfSectionHeight = sectionHeight / 2;
    angleInRadians = Math.asin(halfSectionHeight / radius);
    if ( direction === 'right' ) {
      angleInRadians = Math.PI - angleInRadians;
    }
    return 360 - radiansToDegrees(angleInRadians);
  };

  this.getSliceEndPosition = function getSliceEndPosition() {
    var xPos;
    xPos = Math.sqrt(Math.pow(radius, 2) - Math.pow(sectionHeight / 2, 2));

    if ( direction === 'right' ) {
      xPos = xPos * -1;
    }

    return {
      y: sectionHeight / -2,
      x: xPos
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

    return signedMod(angle + 180, 360) - 180;
  };

  this.slice = function slice(numberOfSlices) {
    var slices, sliceAngle, startAngle, spaceAngle, _i;

    slices     = [];

    spaceAngle = getSpaceAngle(sliceSpace, radius);
    if ( direction === 'right' ) {
      spaceAngle = spaceAngle * -1;
    }

    startAngle = this.getSliceStartAngle();
    sliceAngle = getSliceAngle(
      this.getSliceAngle(), numberOfSlices, spaceAngle
    );

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

  function getSpaceAngle(sliceSpace, radius) {
    return getDegreesFromLength(sliceSpace || 0, radius);
  }

  function signedMod(number, otherNumber) {
    return number - Math.floor(number / otherNumber) * otherNumber;
  }

  function getCenterAngle(startAngle, totalAngle) {
    return startAngle - (totalAngle / 2);
  }

  function absAngle(angle) {
    return angle < 0 ? 360 + angle : angle;
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
