var assert = require('assert');
var round  = require('./support/helpers').round;
var Circle = require('../lib/circle');

describe('Circle', function() {
  var _circle, options, radius;

  function circle() {
    _circle = _circle || new Circle(radius);
    return _circle;
  }

  beforeEach(function() {
    _circle = null;
    radius = 25;
  });

  describe('#getRadius', function() {
    it('returns the radius', function() {
      assert.equal(circle().getRadius(), 25)
    });
  });

  describe('#getCircumference', function() {
    it('returns angle in degrees', function() {
      assert.equal(round(circle().getCircumference()), 157.08);
    });
  });

  describe('#getDegreesFromArcLength', function() {
    it('returns angle in degrees', function() {
      assert.equal(round(circle().getDegreesFromArcLength(15)), 34.38);
    });
  });
});
