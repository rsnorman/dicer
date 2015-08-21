/*!
 * Dicer
 * Copyright(c) 2015 Ryan Scott Norman
 * MIT Licensed
 */

'use strict';

var DEFAULT_DIRECTION = require('./lib/constants').DEFAULT_DIRECTION;
var Slice             = require('./lib/slice');
var Circle            = require('./lib/circle');
var SlicePosition     = require('./lib/slice-position');
var SliceCreator      = require('./lib/slice-creator');

/**
 */
var Dicer = function(radius, sectionHeight, sliceSpace, direction) {
  var fullSlice, circle, sliceCreator, fullSlicePosition;

  direction         = direction || DEFAULT_DIRECTION;
  circle            = new Circle(radius);
  sliceCreator      = new SliceCreator(circle, direction);
  fullSlice         = sliceCreator.fromSectionHeight(sectionHeight);
  fullSlicePosition = new SlicePosition(circle, fullSlice);

  this.getRadius = function getRadius() {
    return circle.getRadius();
  };

  this.getSectionHeight = function getSectionHeight() {
    return sectionHeight;
  };

  this.getSliceSpace = function getSliceSpace() {
    return sliceSpace;
  };

  this.getSliceStartAngle = function() {
    return fullSlice.getStartAngle();
  };

  this.getSliceStartPosition = function getSliceStartPosition() {
    return fullSlicePosition.getStartPosition();
  };

  this.getSliceEndAngle = function getSliceEndAngle() {
    return fullSlice.getEndAngle();
  };

  this.getSliceEndPosition = function getSliceEndPosition() {
    return fullSlicePosition.getEndPosition();
  };

  this.getSliceCenterAngle = function getSliceCenterAngle() {
    return fullSlice.getCenterAngle();
  };

  this.getSliceCenterPosition = function getSliceCenterPosition() {
    return fullSlicePosition.getCenterPosition();
  };

  this.getSliceAngle = function getSliceAngle() {
    return fullSlice.getTotalAngle();
  };

  this.slice = function slice(numberOfSlices) {
    var slices, sliceDegrees, startAngle, spaceSlice, _i;
    slices = [];
    spaceSlice = sliceCreator.fromArcLength(sliceSpace)
    sliceDegrees = getSliceDegrees(
      this.getSliceAngle(), numberOfSlices, spaceSlice.getTotalAngle()
    );

    startAngle = this.getSliceStartAngle();
    for (_i = 0; _i < numberOfSlices; _i++) {
      slices.push(buildSlice(startAngle, sliceDegrees));
      startAngle -= sliceDegrees + spaceSlice.getTotalAngle();
    }

    return slices;
  };

  this.eachSlice = function eachSlice(numberOfSlices, iteratorFn) {
    var _i, _len, _slices;
    _slices = this.slice(numberOfSlices);
    for ( _i = 0, _len = _slices.length; _i < _len; _i++ ) {
      iteratorFn.call(this, _slices[_i]);
    }
  };

  function buildSlice(startAngle, sliceAngle) {
    var slice = new Slice(sliceAngle, {
      startAngle: startAngle
    });
    var slicePosition = new SlicePosition(circle, slice);

    return {
      startAngle:     slice.getStartAngle(),
      centerAngle:    slice.getCenterAngle(),
      endAngle:       slice.getEndAngle(),
      totalAngle:     Math.abs(slice.getTotalAngle()),
      startPosition:  slicePosition.getStartPosition(),
      centerPosition: slicePosition.getCenterPosition(),
      endPosition:    slicePosition.getEndPosition(),
    };
  }

  function getSliceDegrees(fullSliceAngle, numberOfSlices, spaceAngle) {
    var totalSpaceAngle;
    totalSpaceAngle = spaceAngle * (numberOfSlices - 1);
    return (fullSliceAngle - totalSpaceAngle) / numberOfSlices;
  }
};

/**
 * Module exports
 * @public
 */
module.exports = Dicer;
