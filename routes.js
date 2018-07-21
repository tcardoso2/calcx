'use strict';

/*****************************************************
 * Web routes for the API program
 *****************************************************/
let api = require("./lib/api");

module.exports = {
  setup(app, log){
    app.get('/', function (req, res) {
  	  res.send({
      	"message": "Welcome to calx web API. type /help for instructions!"
      })
	});
    app.get('/help', function (req, res) {
  	  res.send({
      	"commands": 
      	{
      		"<url>/add/op1/op2" : "Performs an arithmetic addition of 2 values",
    		"<url>/sub/op1/op2" : "Performs an arithmetic subtraction of 2 values",
    		"<url>/mul/op1/op2" : "Performs an arithmetic multiplication of 2 values",
    		"<url>/div/op1/op2" : "Performs an arithmetic division of 2 values",
    		"<url>/fact/op1" 	: "Performs an arithmetic subtraction of 1 value",
    		"<url>/getlast" 	: "Gets the last result",
    		"<url>/help"        : "Help API commands"
      	}
      });
	});
    app.get('/getLast', function (req, res) {
  	  log.info(`Calculating: ${req.params.op1} + ${req.params.op2}`);
  	  api.add([req.params.op1, req.params.op2], false, (value)=> {
	  	res.send({
	      result: value
		});
  	  });
  	});
  	app.get('/add/:op1/:op2', function (req, res) {
  	  log.info(`Calculating: ${req.params.op1} + ${req.params.op2}`);
  	  api.add([req.params.op1, req.params.op2], false, (value) => {
  	    res.send({
      	  result: value
	    });	
  	  });
  	});
    app.get('/sub/:op1/:op2', function (req, res) {
  	  log.info(`Calculating: ${req.params.op1} - ${req.params.op2}`);
  	  api.sub([req.params.op1, req.params.op2], false, (value) => {
  	    res.send({
      	  result: value
	    });	
  	  });
  	});
    app.get('/mul/:op1/:op2', function (req, res) {
  	  log.info(`Calculating: ${req.params.op1} * ${req.params.op2}`);
  	  api.mul([req.params.op1, req.params.op2], false, (value) => {
  	    res.send({
      	  result: value
	    });	
  	  });	
  	});
    app.get('/div/:op1/:op2', function (req, res) {
  	  log.info(`Calculating: ${req.params.op1} / ${req.params.op2}`);
  	  api.div([req.params.op1, req.params.op2], false, (value) => {
  	    res.send({
      	  result: value
	    });	
  	  });	
  	});
    app.get('/fact/:op1', function (req, res) {
  	  log.info(`Calculating: !${req.params.op1}`);
  	  api.fact([req.params.op1], false, (value) => {
  	    res.send({
      	  result: value
	    });	
  	  });
  	});
  }
}