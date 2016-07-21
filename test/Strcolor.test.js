var assert = require('power-assert');
var Strcolor = require('../Strcolor');

describe('String to color', function() {
  it('returns color code', function(done) {
    assert(Strcolor.get('aoki') === '#03a9f4');
    done();
  });
});

