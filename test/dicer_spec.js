var assert = require('assert');
var Dicer = require('..');

describe('Dicer', function() {
  var _dicer, radius, sectionHeight, sliceSpace;
  beforeEach(function() {
    _dicer        = null;
    radius        = 100;
    sectionHeight = 64;
    sliceSpace    = 0;
  });

  describe('getRadius', function() {
    it('returns the radius of the circle to be diced', function() {
      assert.equal(dicer().getRadius(), 100);
    });
  });

  describe('getSectionHeight', function() {
    it('gets the height of the section to be diced', function() {
      assert.equal(dicer().getSectionHeight(), 64);
    });
  });

  describe('getSliceSpace', function() {
    beforeEach(function() {
      sliceSpace = 5;
    });

    it('gets the space in between slices', function() {
      assert.equal(dicer().getSliceSpace(), 5);
    });
  });

  describe('getSliceStartAngle', function() {
    it('returns the start angle of the slice', function() {
      assert.equal(round(dicer().getSliceStartAngle()), 18.66);
    });
  });

  describe('getSliceStartPosition', function() {
    it('returns the start position of the slice on the circle', function() {
      assert.equal(round(dicer().getSliceStartPosition().x), 94.74);
      assert.equal(dicer().getSliceStartPosition().y, 32);
    });
  });

  describe('getSliceEndAngle', function() {
    it('returns the end angle of the slice', function() {
      assert.equal(round(dicer().getSliceEndAngle()), 341.34);
    });
  });

  describe('getSliceEndPosition', function() {
    it('returns the end position of the slice on the circle', function() {
      assert.equal(round(dicer().getSliceEndPosition().x), 94.74);
      assert.equal(dicer().getSliceEndPosition().y, -32);
    });
  });

  describe('getSliceAngle', function() {
    it('returns the total angle of the slice', function() {
      assert.equal(round(dicer().getSliceAngle()), 37.33);
    });
  });

  describe('getSliceCenterAngle', function() {
    it('returns the angle that bisects the slice', function() {
      assert.equal(round(dicer().getSliceCenterAngle()), 0);
    });
  });

  describe('getSliceCenterPosition', function() {
    it('returns the center position of the slice on the circle', function() {
      assert.equal(round(dicer().getSliceCenterPosition().x), 100);
      assert.equal(round(dicer().getSliceCenterPosition().y), 0);
    });
  });

  describe('slice', function() {
    var _slice, numberOfSlices, sliceIndex;

    describe('with 1 slice', function() {
      beforeEach(function() {
        _slice         = null;
        numberOfSlices = 1;
        sliceIndex     = 0;
      });

      it('returns the start angle', function() {
        assert.equal(round(slice().startAngle), 18.66);
      });

      it('returns the center angle', function() {
        assert.equal(round(slice().centerAngle), 0);
      });

      it('returns the end angle', function() {
        assert.equal(round(slice().endAngle), 341.34);
      });

      it('returns the total angle', function() {
        assert.equal(round(slice().totalAngle), 37.33);
      });

      it('returns the start position on the circle', function() {
        assert.equal(round(slice().startPosition.x), 94.74);
        assert.equal(round(slice().startPosition.y), 32);
      });

      it('returns the center position on the circle', function() {
        assert.equal(round(slice().centerPosition.x), 100);
        assert.equal(round(slice().centerPosition.y), 0);
      });

      it('returns the end position on the circle', function() {
        assert.equal(round(slice().endPosition.x), 94.74);
        assert.equal(round(slice().endPosition.y), -32);
      });

      describe('with space between slice', function() {
        beforeEach(function() {
          sliceSpace = 5;
        });

        it('returns the start angle', function() {
          assert.equal(round(slice().startAngle), 18.66);
        });

        it('returns the center angle', function() {
          assert.equal(round(slice().centerAngle), 0);
        });

        it('returns the end angle', function() {
          assert.equal(round(slice().endAngle), 341.34);
        });

        it('returns the total angle', function() {
          assert.equal(round(slice().totalAngle), 37.33);
        });

        it('returns the start position on the circle', function() {
          assert.equal(round(slice().startPosition.x), 94.74);
          assert.equal(round(slice().startPosition.y), 32);
        });

        it('returns the center position on the circle', function() {
          assert.equal(round(slice().centerPosition.x), 100);
          assert.equal(round(slice().centerPosition.y), 0);
        });

        it('returns the end position on the circle', function() {
          assert.equal(round(slice().endPosition.x), 94.74);
          assert.equal(round(slice().endPosition.y), -32);
        });
      });
    });

    describe('with 2 slice', function() {
      beforeEach(function() {
        _slice = null;
        numberOfSlices = 2
      });

      describe('for the first slice', function() {
        it('returns the start angle', function() {
          assert.equal(round(slice().startAngle), 18.66);
        });

        it('returns the center angle', function() {
          assert.equal(round(slice().centerAngle), 9.33);
        });

        it('returns the end angle', function() {
          assert.equal(round(slice().endAngle), 0);
        });

        it('returns the total angle', function() {
          assert.equal(round(slice().totalAngle), 18.66);
        });

        it('returns the start position on the circle', function() {
          assert.equal(round(slice().startPosition.x), 94.74);
          assert.equal(round(slice().startPosition.y), 32);
        });

        it('returns the center position on the circle', function() {
          assert.equal(round(slice().centerPosition.x), 98.68);
          assert.equal(round(slice().centerPosition.y), 16.21);
        });

        it('returns the end position on the circle', function() {
          assert.equal(round(slice().endPosition.x), 100);
          assert.equal(round(slice().endPosition.y), 0);
        });
      });

      describe('for the second slice', function() {
        beforeEach(function() {
          _slice = null;
          sliceIndex = 1;
        });

        it('returns the start angle', function() {
          assert.equal(round(slice().startAngle), 0);
        });

        it('returns the center angle', function() {
          assert.equal(round(slice().centerAngle), -9.33);
        });

        it('returns the end angle', function() {
          assert.equal(round(slice().endAngle), 341.34);
        });

        it('returns the total angle', function() {
          assert.equal(round(slice().totalAngle), 18.66);
        });

        it('returns the start position on the circle', function() {
          assert.equal(round(slice().startPosition.x), 100);
          assert.equal(round(slice().startPosition.y), 0);
        });

        it('returns the center position on the circle', function() {
          assert.equal(round(slice().centerPosition.x), 98.68);
          assert.equal(round(slice().centerPosition.y), -16.21);
        });

        it('returns the end position on the circle', function() {
          assert.equal(round(slice().endPosition.x), 94.74);
          assert.equal(round(slice().endPosition.y), -32);
        });
      });
    });

    function slice() {
      return _slice = _slice || dicer().slice(numberOfSlices)[sliceIndex];
    }
  });

  function dicer() {
    return _dicer = _dicer || new Dicer(radius, sectionHeight, sliceSpace);
  }

  function round(degrees) {
    if (typeof degrees === 'undefined' || degrees === null) {
      return degrees;
    }
    return Math.round(degrees * 100) / 100;
  }
});
