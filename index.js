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
var Dicer = function(settings) {
  var fullSlice, circle, sliceCreator, fullSlicePosition,
    radius, sliceSpace, direction, sectionHeight;
  var DEFAULT_SLICE_SPACE = 0;

  // Settings
  settings      = settings || {};
  radius        = settings.radius;
  sectionHeight = settings.sectionHeight;
  sliceSpace    = settings.sliceSpace || DEFAULT_SLICE_SPACE;
  direction     = settings.direction  || DEFAULT_DIRECTION;

  circle = new Circle(radius);

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
    return this._getSectionSlice().getStartAngle();
  };

  this.getSliceStartPosition = function getSliceStartPosition() {
    return this._getSlicePosition().getStartPosition();
  };

  this.getSliceEndAngle = function getSliceEndAngle() {
    return this._getSectionSlice().getEndAngle();
  };

  this.getSliceEndPosition = function getSliceEndPosition() {
    return this._getSlicePosition().getEndPosition();
  };

  this.getSliceCenterAngle = function getSliceCenterAngle() {
    return this._getSectionSlice().getCenterAngle();
  };

  this.getSliceCenterPosition = function getSliceCenterPosition() {
    return this._getSlicePosition().getCenterPosition();
  };

  this.getSliceAngle = function getSliceAngle() {
    return this._getSectionSlice().getTotalAngle();
  };

  this.slice = function slice(numberOfSlices) {
    var slices, sliceDegrees, startAngle, spaceSlice, _i;
    slices = [];
    spaceSlice = this._getSliceCreator().fromArcLength(sliceSpace)
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

  this._getSliceCreator = function() {
    return sliceCreator = sliceCreator || new SliceCreator(circle, direction);
  };

  this._getSectionSlice = function() {
    return fullSlice =
      fullSlice || this._getSliceCreator().fromSectionHeight(sectionHeight);
  };

  this._getSlicePosition = function() {
    return fullSlicePosition =
      fullSlicePosition || new SlicePosition(circle, this._getSectionSlice());
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
