/*eslint-disable*/
'use strict';
var assert = require('chai').assert;
var expect = require('chai').expect;
var Amplitude = require('..');

describe('amplitude api test', function() {

  it('throws an error if not created with new', function(done) {
    var fn = function() {
      var amplitude = Amplitude();
    };

    expect(fn).to.throw(Error);
    done();
  });
});
