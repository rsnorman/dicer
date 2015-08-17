var assert = require('assert');
var Dicer = require('..');

describe('Dicer', function() {

  describe('getRadius', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100);
    });

    it('returns the radius of the circle to be diced', function() {
      assert(dicer.getRadius() == 100);
    });
  });

  describe('getSectionHeight', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100, 64);
    });

    it('gets the height of the section to be diced', function() {
      assert(dicer.getSectionHeight() == 64);
    });
  });

  describe('getSectionSpace', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100, 64, 5);
    });

    it('gets the space in between slices', function() {
      assert(dicer.getSectionSpace() == 5);
    });
  });

  describe('getSliceStartAngle', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100, 64);
    });

    it('returns the start angle of the slice', function() {
      assert.equal(round(dicer.getSliceStartAngle()), 17.74);
    });
  });

  describe('getSliceStartPosition', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100, 64);
    });

    it('returns the start position of the slice on the circle', function() {
      assert.equal(round(dicer.getSliceStartPosition().x), 94.74);
      assert.equal(dicer.getSliceStartPosition().y, 32);
    });
  });

  describe('getSliceEndAngle', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100, 64);
    });

    it('returns the end angle of the slice', function() {
      assert.equal(round(dicer.getSliceEndAngle()), 342.26);
    });
  });

  describe('getSliceEndPosition', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100, 64);
    });

    it('returns the end position of the slice on the circle', function() {
      assert.equal(round(dicer.getSliceEndPosition().x), 94.74);
      assert.equal(dicer.getSliceEndPosition().y, -32);
    });
  });

  describe('getSliceAngle', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100, 64);
    });

    it('returns the total angle of the slice', function() {
      assert.equal(round(dicer.getSliceAngle()), 35.49);
    });
  });

  describe('getSliceCenterAngle', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100, 64);
    });

    it('returns the angle that bisects the slice', function() {
      assert.equal(round(dicer.getSliceCenterAngle()), 0);
    });
  });

  describe('getSliceCenterPosition', function() {
    var dicer;
    beforeEach(function() {
      dicer = new Dicer(100, 64);
    });

    it('returns the center position of the slice on the circle', function() {
      assert.equal(round(dicer.getSliceCenterPosition().x), 100);
      assert.equal(round(dicer.getSliceCenterPosition().y), 0);
    });
  });

  describe('slice', function() {
    var dicer, slice;
    beforeEach(function() {
      dicer = new Dicer(100, 64);
    });

    describe('with 1 slice', function() {
      beforeEach(function() {
        slice = dicer.slice(1)[0];
      });

      it('returns the start angle', function() {
        assert.equal(round(slice.startAngle), 17.74);
      });

      it('returns the center angle', function() {
        assert.equal(round(slice.centerAngle), 0);
      });

      it('returns the end angle', function() {
        assert.equal(round(slice.endAngle), 342.26);
      });

      it('returns the total angle', function() {
        assert.equal(round(slice.totalAngle), 35.49);
      });


      it('returns the start position on the circle', function() {
        assert.equal(round(slice.startPosition.x), 94.74);
        assert.equal(round(slice.startPosition.y), 32);
      });

      it('returns the center position on the circle', function() {
        assert.equal(round(slice.centerPosition.x), 100);
        assert.equal(round(slice.centerPosition.y), 0);
      });

      it('returns the end position on the circle', function() {
        assert.equal(round(slice.endPosition.x), 94.74);
        assert.equal(round(slice.endPosition.y), -32);
      });

    });
  });

  function round(degrees) {
    if (typeof degrees === 'undefined' || degrees === null) {
      return degrees;
    }
    return Math.round(degrees * 100) / 100;
  }
});
