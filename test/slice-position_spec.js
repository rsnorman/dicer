var assert = require('assert');
var round  = require('./support/helpers').round;
var Slice = require('../lib/slice');
var Circle = require('../lib/circle');
var SlicePosition = require('../lib/slice-position');

describe('SlicePosition', function() {
  var _slicePosition, options, radius, totalAngle, startAngle;

  function slicePosition() {
    var slice = new Slice(30);
    var circle = new Circle(25);
    return _slicePosition = _slicePosition || new SlicePosition(circle, slice);
  }

  beforeEach(function() {
    _slicePosition = null;
    radius = 25;
  });

  describe('#getStartPosition', function() {
    it('returns x position', function() {
      assert.equal(slicePosition().getStartPosition().x, 25);
    });

    it('returns y position', function() {
      assert.equal(slicePosition().getStartPosition().y, 0);
    });
  });

  describe('#getCenterPosition', function() {
    it('returns x position', function() {
      assert.equal(round(slicePosition().getCenterPosition().x), 24.15);
    });

    it('returns y position', function() {
      assert.equal(round(slicePosition().getCenterPosition().y), -6.47);
    });
  });

  describe('#getEndPosition', function() {
    it('returns x position', function() {
      assert.equal(round(slicePosition().getEndPosition().x), 21.65);
    });

    it('returns y position', function() {
      assert.equal(round(slicePosition().getEndPosition().y), -12.5);
    });
  });
});
