var assert = require('assert');
var Slice = require('../lib/slice');

describe('Slice', function() {
  var _slice, options, totalAngle, startAngle;

  function slice() {
    _slice = _slice || new Slice(totalAngle, {
      startAngle: startAngle
    });
    return _slice;
  }

  beforeEach(function() {
    _slice = null;
    totalAngle = 30;
    startAngle = 0;
  });

  describe('#getStartAngle', function() {
    describe('with positive angle', function() {
      beforeEach(function() {
        startAngle = 90
      });

      it('returns angle in degrees', function() {
        assert.equal(slice().getStartAngle(), 90);
      });
    });

    describe('with negative angle', function() {
      beforeEach(function() {
        startAngle = -90
      });

      it('returns angle in positive degrees', function() {
        assert.equal(slice().getStartAngle(), 270);
      });
    });
  });

  describe('#getCenterAngle', function() {
    describe('with positive angle', function() {
      beforeEach(function() {
        startAngle = 90
      });

      it('returns angle in degrees', function() {
        assert.equal(slice().getCenterAngle(), 75);
      });
    });

    describe('with negative angle', function() {
      beforeEach(function() {
        startAngle = -90
      });

      it('returns angle in positive degrees', function() {
        assert.equal(slice().getCenterAngle(), 255);
      });
    });
  });

  describe('#getEndAngle', function() {
    describe('with positive angle', function() {
      beforeEach(function() {
        startAngle = 90
      });

      it('returns angle in degrees', function() {
        assert.equal(slice().getEndAngle(), 60);
      });
    });

    describe('with negative angle', function() {
      beforeEach(function() {
        startAngle = -90
      });

      it('returns angle in positive degrees', function() {
        assert.equal(slice().getEndAngle(), 240);
      });
    });
  });

  describe('#getTotalAngle', function() {
    it('returns the total angle in degrees', function() {
      assert.equal(slice().getTotalAngle(), 30);
    });
  });
});
