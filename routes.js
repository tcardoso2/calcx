'use strict';

/*****************************************************
 * Simple web routes module for the API program
 * For this case, all of the routes are called via HTTP GET verb for simplification.
 * On a real production scenario would consider using post instead for actions which
 * change state.
 *****************************************************/
let api = require("./lib/api");


module.exports = {
  setup(app, log){
/**
 * GET: Root (/) of the api
 * @return {object} A json response Welcoming the user; 
 * @example curl http://localhost:3000/
 */
     app.get('/', function (req, res) {
  	  res.send({
      	"message": "Welcome to calx web API. type /help for instructions!"
      })
	});
/**
 * GET: help (/help) information for the API. 
 * @return {object} Returns a simple json result with the several options for the API. 
 * @example curl http://localhost:3000/help
 */
    app.get('/help', function (req, res) {
  	  res.send({
      	"commands": 
      	{
      		"<url>/add/op1/op2" : "Performs an arithmetic addition of 2 values",
    		"<url>/sub/op1/op2" : "Performs an arithmetic subtraction of 2 values",
    		"<url>/mul/op1/op2" : "Performs an arithmetic multiplication of 2 values",
    		"<url>/div/op1/op2" : "Performs an arithmetic division of 2 values",
    		"<url>/fact/op1" 	: "Performs an arithmetic subtraction of 1 value",
    		"<url>/help"        : "Help API commands"
      	}
      });
	});
 /**
 * GET: Adds (/add) 2 operands
 * @param {number} op1, the first operand of the addition
 * @param {number} op2, the second operand of the addition
 * @return {object} Returns the result of the operation in json format 
 * @example curl http://localhost:3000/add/12/10
 * //Response
 * { result: 22 }
 */
  	app.get('/add/:op1/:op2', function (req, res) {
  	  log.info(`Calculating: ${req.params.op1} + ${req.params.op2}`);
  	  api.add([req.params.op1, req.params.op2], false, (value) => {
  	    res.send({
      	  result: value
	    });	
  	  });
  	});
 /**
 * GET: Subtracts (/sub) 2 operands
 * @param {number} op1, the first operand of the subtraction
 * @param {number} op2, the second operand of the subtraction
 * @return {object} Returns the result of the operation in json format 
 * @example curl http://localhost:3000/sub/12/10
 * //Response
 * { result: 2 }
 */
    app.get('/sub/:op1/:op2', function (req, res) {
  	  log.info(`Calculating: ${req.params.op1} - ${req.params.op2}`);
  	  api.sub([req.params.op1, req.params.op2], false, (value) => {
  	    res.send({
      	  result: value
	    });	
  	  });
  	});
 /**
 * GET: Multiplies (/mul) 2 operands
 * @param {number} op1, the first operand of the multiplication
 * @param {number} op2, the second operand of the multiplication
 * @return {object} Returns the result of the operation in json format 
 * @example curl http://localhost:3000/mul/12/10
 * //Response
 * { result: 120 }
 */
    app.get('/mul/:op1/:op2', function (req, res) {
  	  log.info(`Calculating: ${req.params.op1} * ${req.params.op2}`);
  	  api.mul([req.params.op1, req.params.op2], false, (value) => {
  	    res.send({
      	  result: value
	    });	
  	  });	
  	});
 /**
 * GET: Divides (/div) 2 operands
 * @param {number} op1, the first operand of the division
 * @param {number} op2, the second operand of the division
 * @return {object} Returns the result of the operation in json format 
 * @example curl http://localhost:3000/div/12/10
 * //Response
 * { result: 1.2 }
 */
    app.get('/div/:op1/:op2', function (req, res) {
  	  log.info(`Calculating: ${req.params.op1} / ${req.params.op2}`);
  	  api.div([req.params.op1, req.params.op2], false, (value) => {
  	    res.send({
      	  result: value
	    });	
  	  });	
  	});
 /**
 * GET: Calculates the factorial (/fac) of the provided operand. Note only accepts one param, adding more will result in route pattern unmatch
 * @param {number} op1, the number to factor
 * @return {object} Returns the result of the operation in json format 
 * @example curl http://localhost:3000/fact/4
 * //Response
 * { result: 24 }
 */
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