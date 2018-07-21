 /*****************************************************
 * CLI tests
 * Some basic Command line tests to check the CLI specs
 * are working properly
 *****************************************************/

let chai = require('chai');
let should = chai.should();
let data = require('../lib/data');

before(function(done) {
  done();
});

after(function(done) {
  // here you can clear fixtures, etc.
  done();
});

describe(`For persisting data`, function() {
  it("should be possible to reset the environment variable", function (done) {
    data.resetLastResult(()=>{
      data.getLastResult((value)=>{
        value.should.equal(0);
        done();
      });
      //console.log(process.env);
    }, true);
  });
  it("The equivalent Environment variable should yield the same value", function () {
    process.env.CALCX_LAST_RESULT.should.equal('0');
  });
  it("should be possible to set the environment variable", function () {
    data.setLastResult(10);
    data.getLastResult((value)=>{
      value.should.equal(10);
      process.env.CALCX_LAST_RESULT.should.equal('10');
    });
  });
  it("should be possible to reset the environment variable again", function (done) {
    data.resetLastResult(()=>{
      data.getLastResult((value)=>{
        value.should.equal(0);
        done();
      });
    }, true);
  });
});