 /*****************************************************
 * CLI tests
 * Some basic Command line tests to check the CLI specs
 * are working properly
 *****************************************************/

let chai = require('chai');
let should = chai.should();
let dataLib = require('../lib/data');

let cmd=require('node-cmd');	//Allows executing commands as it from the command line

var command = 'node program.js'

let chaiAsPromised = require("chai-as-promised");
let chaiHttp = require('chai-http');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

before(function(done) {
  done();
});

after(function(done) {
  // here you can clear fixtures, etc.
  done();
});

describe(`When running the program "${command}"" from the command line,`, function() {
  it("should prompt for proper arguments", function (done) {
    dataLib.resetLastResult(()=>{
      cmd.get(
        command,
        function(err, data, stderr){
          if(err){
            console.log("ERRORS: ", err);
            should.fail();
          }
  		    (err == null).should.equal(true);
  		    (data.trim()).should.equal("calcx calculator CLI tool. type --help for command-line usage.");
          done();
        }
      );
    });
  });

  it("When typing '--help' should show the list of available commands, add, sub, mul, div fact", function (done) {
    cmd.get(
      `${command} --help`,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
          should.fail();
        }
        (err == null).should.equal(true);
        (data.trim()).should.equal("Usage: program [options]\n\n  Options:\n\n    -a, --add      Performs an arithmetic addition of the provided list of values (space separated).\n    -s, --sub      Performs an arithmetic subtraction of the provided list of values (space separated).\n    -m, --mul      Performs an arithmetic multiplication of the provided list of values (space separated).\n    -d, --div      Performs an arithmetic division of the provided list of values (space separated).\n    -f, --fact     Performs a factorial calculation of the provided first integer value, ignoring if more than one value is provied. Value must be an integer.\n    -p, --persist  If set, it persists the result in the environment and next calculation picks it up\n    -c, --clear    Clears any previously persisted value\n    -w, --web      Start the Web API\n    -h, --help     output usage information");
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
          should.fail();
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
          should.fail();
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
          should.fail();
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
          should.fail();
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
          should.fail();
        }
        (err == null).should.equal(true);
        (data.trim()).should.equal("720");
        done();
      }
    );
  });

  it("When typing '--web', starts the web-api", function (done) {
    this.timeout(8000);
    cmd.get(
      `${command} --web`,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
          should.fail();
        }
        (err == null).should.equal(true);
        setTimeout(()=>{
          chai.request(`http://localhost:3000`)
            .get('/')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.eql({message: 'Welcome to calx web API. type /help for instructions!'});
              done();
            });
        },5000);
      }
    );
  });

  it("When typing '--clear', clears any persisted value ", function (done) {
    cmd.get(
      `${command} --clear`,
      function(err, data, stderr){
        if(err){
          console.log("ERRORS: ", err);
          should.fail();
        }
        (err == null).should.equal(true);
        (data.trim()).should.equal("(Saved result 0)");
        dataLib.getLastResult((value)=>{
          value.should.equal(0);
          done();
        });
      }
    );
  });

  it("When typing a command with '-p', it persists the result", function (done) {
    //For this command it is acually required to reset the last result env var
    dataLib.resetLastResult(()=>{
      cmd.get(
        `${command} --add 3 4 -p`,
        function(err, data, stderr){
          if(err){
            console.log("ERRORS: ", err);
            should.fail();
          }
          (err == null).should.equal(true);
          (data.trim()).should.equal("(Saved result 7)\n7");
          setTimeout(()=> {
            dataLib.getLastResult((value)=>{
              value.should.equal(7);
              done();
            });
          }, 500)
        });
    });
  });

  it("When typing a command with '-p', it calculates the result in the last command to the current command", function (done) {
        //For this command it is acually required to reset the last result env var
    dataLib.resetLastResult(()=>{
      cmd.get(
        `${command} --fact 3 -p`,
        function(err, data, stderr){
          if(err){
            console.log("ERRORS: ", err);
            should.fail();
          }
          (err == null).should.equal(true);
          (data.trim()).should.equal("6");
          //second command
          cmd.get(`${command} --sub 2`,
            function(err, data, stderr){
              if(err){
                data.should.equal(stderr);
                should.fail();
              }
              data.should.equal("4");
              done();
            });
        }
      );
    });
  });
});