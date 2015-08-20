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

    function runSliceSpecs(description, numberOfSlices) {
      var args, expectedSlices, dicerOptions;
      args = Array.prototype.slice.call(arguments);

      if (args.length === 3) {
        expectedSlices = args[2];
        dicerOptions = {};
      } else {
        dicerOptions = args[2];
        expectedSlices = args[3];
      }

      function runSliceSpecsAtIndex(sliceIndex, dicerOptions) {
        describe(description, function() {
          describe('for slice at index ' + sliceIndex, function() {
            var slice, expectedSlice;

            beforeEach(function() {
              var dicer;
              dicer = new Dicer(radius, sectionHeight, dicerOptions.sliceSpace);
              slice = dicer.slice(numberOfSlices)[sliceIndex];
              expectedSlice = expectedSlices[sliceIndex];
            });

            it('returns the start angle', function() {
              assert.equal(round(slice.startAngle), expectedSlice.startAngle);
            });

            it('returns the center angle', function() {
              assert.equal(round(slice.centerAngle), expectedSlice.centerAngle);
            });

            it('returns the end angle', function() {
              assert.equal(round(slice.endAngle), expectedSlice.endAngle);
            });

            it('returns the total angle', function() {
              assert.equal(round(slice.totalAngle), expectedSlice.totalAngle);
            });

            it('returns the start position on the circle', function() {
              assert.equal(
                round(slice.startPosition.x), expectedSlice.startPosition.x
              );
              assert.equal(
                round(slice.startPosition.y), expectedSlice.startPosition.y
              );
            });

            it('returns the center position on the circle', function() {
              assert.equal(
                round(slice.centerPosition.x), expectedSlice.centerPosition.x
              );
              assert.equal(
                round(slice.centerPosition.y), expectedSlice.centerPosition.y
              );
            });

            it('returns the end position on the circle', function() {
              assert.equal(
                round(slice.endPosition.x), expectedSlice.endPosition.x
              );
              assert.equal(
                round(slice.endPosition.y), expectedSlice.endPosition.y
              );
            });
          });
        });
      }

      for ( var i = 0; i < numberOfSlices; i++ ) {
        runSliceSpecsAtIndex(i, dicerOptions);
      }
    }

    runSliceSpecs('for 1 slice', 1, [{
      startAngle: 18.66,
      centerAngle: 0,
      endAngle: 341.34,
      totalAngle: 37.33,
      startPosition: {
        x: 94.74,
        y: 32
      },
      centerPosition: {
        x: 100,
        y: 0
      },
      endPosition: {
        x: 94.74,
        y: -32
      }
    }]);

    runSliceSpecs('for 1 slice with slice space', 1, {
      sliceSpace: 5
    }, [{
      startAngle: 18.66,
      centerAngle: 0,
      endAngle: 341.34,
      totalAngle: 37.33,
      startPosition: {
        x: 94.74,
        y: 32
      },
      centerPosition: {
        x: 100,
        y: 0
      },
      endPosition: {
        x: 94.74,
        y: -32
      }
    }]);

    runSliceSpecs('for 2 slices', 2, [{
      startAngle: 18.66,
      centerAngle: 9.33,
      endAngle: 0,
      totalAngle: 18.66,
      startPosition: {
        x: 94.74,
        y: 32
      },
      centerPosition: {
        x: 98.68,
        y: 16.21
      },
      endPosition: {
        x: 100,
        y: 0
      }
    }, {
      startAngle: 0,
      centerAngle: 350.67,
      endAngle: 341.34,
      totalAngle: 18.66,
      startPosition: {
        x: 100,
        y: 0
      },
      centerPosition: {
        x: 98.68,
        y: -16.21
      },
      endPosition: {
        x: 94.74,
        y: -32
      }
    }]);

    runSliceSpecs('for 2 slices with space', 2, {
      sliceSpace: 5
    }, [{
      startAngle: 18.66,
      centerAngle: 10.05,
      endAngle: 1.43,
      totalAngle: 17.23,
      startPosition: {
        x: 94.74,
        y: 32
      },
      centerPosition: {
        x: 98.47,
        y: 17.45
      },
      endPosition: {
        x: 99.97,
        y: 2.5
      }
    }, {
      startAngle: 358.57,
      centerAngle: 349.95,
      endAngle: 341.34,
      totalAngle: 17.23,
      startPosition: {
        x: 99.97,
        y: -2.5
      },
      centerPosition: {
        x: 98.47,
        y: -17.45
      },
      endPosition: {
        x: 94.74,
        y: -32
      }
    }]);

    runSliceSpecs('for 3 slices', 3, [{
      startAngle: 18.66,
      centerAngle: 12.44,
      endAngle: 6.22,
      totalAngle: 12.44,
      startPosition: {
        x: 94.74,
        y: 32
      },
      centerPosition: {
        x: 97.65,
        y: 21.55
      },
      endPosition: {
        x: 99.41,
        y: 10.84
      }
    }, {
      startAngle: 6.22,
      centerAngle: 0,
      endAngle: 353.78,
      totalAngle: 12.44,
      startPosition: {
        x: 99.41,
        y: 10.84
      },
      centerPosition: {
        x: 100,
        y: 0
      },
      endPosition: {
        x: 99.41,
        y: -10.84
      }
    }, {
      startAngle: 353.78,
      centerAngle: 347.56,
      endAngle: 341.34,
      totalAngle: 12.44,
      startPosition: {
        x: 99.41,
        y: -10.84
      },
      centerPosition: {
        x: 97.65,
        y: -21.55
      },
      endPosition: {
        x: 94.74,
        y: -32
      }
    }]);

    runSliceSpecs('for 3 slices with space', 3, {
     sliceSpace: 5
    }, [{
      startAngle: 18.66,
      centerAngle: 13.4,
      endAngle: 8.13,
      totalAngle: 10.53,
      startPosition: {
        x: 94.74,
        y: 32
      },
      centerPosition: {
        x: 97.28,
        y: 23.17
      },
      endPosition: {
        x: 98.99,
        y: 14.14
      }
    }, {
      startAngle: 5.27,
      centerAngle: 0,
      endAngle: 354.73,
      totalAngle: 10.53,
      startPosition: {
        x: 99.58,
        y: 9.18
      },
      centerPosition: {
        x: 100,
        y: 0
      },
      endPosition: {
        x: 99.58,
        y: -9.18
      }
    }, {
      startAngle: 351.87,
      centerAngle: 346.6,
      endAngle: 341.34,
      totalAngle: 10.53,
      startPosition: {
        x: 98.99,
        y: -14.14
      },
      centerPosition: {
        x: 97.28,
        y: -23.17
      },
      endPosition: {
        x: 94.74,
        y: -32
      }
    }]);
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
