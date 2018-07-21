 /*****************************************************
 * CLI tests
 * Some basic Command line tests to check the specs
 * are working properly
 *****************************************************/

let chai = require('chai');
let should = chai.should();

let cmd=require('node-cmd');	//Allows executing commands as it from the command line

var command = 'node program.js'

before(function(done) {
  done();
});

after(function(done) {
  // here you can clear fixtures, etc.
  done();
});

describe(`When running the program "${command}"" from the command line,`, function() {
  it("should prompt for proper arguments", function (done) {
    cmd.get(
      command,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
        }
		    (err == null).should.equal(true);
		    (data.trim()).should.equal("calcx calculator CLI tool. type --help for command-line usage.");
        done();
      }
    );
  });

  it("When typing '--help' should show the list of available commands, add, sub, mul, div fact", function (done) {
    cmd.get(
      `${command} --help`,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
        }
        (err == null).should.equal(true);
        (data.trim()).should.equal("Usage: program [options]\n\n  Options:\n\n    -a, --add   Performs an arithmetic addition of the provided list of values (space separated).\n    -s, --sub   Performs an arithmetic subtraction of the provided list of values (space separated)..\n    -m, --mul   Performs an arithmetic multiplication of the provided list of values (space separated)..\n    -d, --div   Performs an arithmetic division of the provided list of values (space separated)..\n    -f, --fact  Performs a factorial calculation of the provided first integer value, ignoring if more than one value is provied. Value must be an integer.\n    -h, --help  output usage information");
        done();
      }
    );
  });

  it("When typing '--add' with a list of values should add it to the last result", function (done) {
    cmd.get(
      `${command} --add 10 12`,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
        }
        (err == null).should.equal(true);
        (data.trim()).should.equal("22");
        done();
      }
    );
  });

  it("When typing '--sub' with a list of values should subtract it to the last result", function (done) {
    cmd.get(
      `${command} --sub 10 12`,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
        }
        (err == null).should.equal(true);
        (data.trim()).should.equal("-2");
        done();
      }
    );
  });
  it("When typing '--mul' with a list of values should subtract it to the last result", function (done) {
    cmd.get(
      `${command} --mul 10 12.5`,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
        }
        (err == null).should.equal(true);
        (data.trim()).should.equal("125");
        done();
      }
    );
  });
  it("When typing '--div' with a list of values should subtract it to the last result", function (done) {
    cmd.get(
      `${command} --div 10 20`,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
        }
        (err == null).should.equal(true);
        (data.trim()).should.equal("0.5");
        done();
      }
    );
  });
  it("When typing '--fact' with a list of values should calculate the factorial (parses always as Int)", function (done) {
    cmd.get(
      `${command} --fact 6`,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
        }
        (err == null).should.equal(true);
        (data.trim()).should.equal("720");
        done();
      }
    );
  });
});