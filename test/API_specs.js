 /*****************************************************
 * API tests
 * Some basic Command line tests to check the API specs
 * are working properly
 *****************************************************/

let chai = require('chai');
let should = chai.should();
let chaiAsPromised = require("chai-as-promised");
let express = require('express');
let chaiHttp = require('chai-http');
let web = require('../web');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

let portUsed = 2999;

before(function(done) {
  done();
});

after(function(done) {
  // here you can clear fixtures, etc.
  done();
});

describe(`When calling the API,`, function() {
  it("should prompt for proper arguments when a GET is done in the root", function (done) {
    web.start({ port: portUsed }, (err)=>{
      err.should.equal(false);
      chai.request(`http://localhost:${portUsed}`)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.eql({message: 'Welcome to calx web API. type /help for instructions!'});
          done();
        });
    });
  });

  it("When going to the help url should show the list of available commands, add, sub, mul, div fact", function (done) {
    chai.request(`http://localhost:${portUsed}`)
      .get('/help')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({
          "commands": 
          {
            "<url>/add/op1/op2" : "Performs an arithmetic addition of 2 values",
            "<url>/sub/op1/op2" : "Performs an arithmetic subtraction of 2 values",
            "<url>/mul/op1/op2" : "Performs an arithmetic multiplication of 2 values",
            "<url>/div/op1/op2" : "Performs an arithmetic division of 2 values",
            "<url>/fact/op1"    : "Performs an arithmetic subtraction of 1 value",
            "<url>/help"        : "Help API commands"
          }
        });
        done();
    });
  });

  it("should be able to add 2 values", function (done) {
    chai.request(`http://localhost:${portUsed}`)
      .get('/add/10/20')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({result: 30});
        done();
      });
  });

  it("should be able to subtract 2 values", function (done) {
    chai.request(`http://localhost:${portUsed}`)
      .get('/sub/10/12')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({result: -2});
        done();
      });
  });
  
  it("should be able to multiply 2 values", function (done) {
    chai.request(`http://localhost:${portUsed}`)
      .get('/mul/10/12.5')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({result: 125});
        done();
      });
  });
  
  it("should be able to divide 2 values", function (done) {
    chai.request(`http://localhost:${portUsed}`)
      .get('/div/10/20')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({result: 0.5});
        done();
      });
  });  

  it("should be able to factorize one value", function (done) {
    chai.request(`http://localhost:${portUsed}`)
      .get('/fact/6')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({result: 720});
        done();
      });
  });  
});