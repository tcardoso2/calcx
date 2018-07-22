'use strict';

/*****************************************************
 * Library API
 * Both the CLI and API programs call the same lib.
 * There's space for improvement, including persisting
 * the last calculated value to use for the following
 * operation, etc. That was not included in the 
 * requirements
 *****************************************************/

var cache = require('persistent-cache');
let storage = cache();

//When result is done a callback should be done passing the final result
module.exports = {
/**
 * Add operation
 * @param {object} args expects a json object with the 2 operands, see example
 * @param {bool} if true would persist the value (WIP). Not implemented in this version.
 * @param {Function} callback function, called when operation is done
 * @example add({ op1: 10, op2: 12 }, false, (result)=>{
 *   console.log(`Result of operation is ${result}`); 
 * });
 */
  add: (args, persist, callback) => {
    operation(args, persist, (a,b) => { return parseFloat(a) + parseFloat(b) }, callback); 
  },
/**
 * Subract operation
 * @param {object} args expects a json object with the 2 operands, see example
 * @param {bool} if true would persist the value (WIP). Not implemented in this version.
 * @param {Function} callback function, called when operation is done
 * @example add({ op1: 10, op2: 12 }, false, (result)=>{
 *   console.log(`Result of operation is ${result}`); 
 * });
 */
  sub: (args, persist, callback) => {
  	operation(args, persist, (a,b) => { return parseFloat(a) - parseFloat(b) }, callback);
  },
/**
 * Multiplication operation
 * @param {object} args expects a json object with the 2 operands, see example
 * @param {bool} if true would persist the value (WIP). Not implemented in this version.
 * @param {Function} callback function, called when operation is done
 * @example add({ op1: 10, op2: 12 }, false, (result)=>{
 *   console.log(`Result of operation is ${result}`); 
 * });
 */
  mul: (args, persist, callback) => {
    operation(args, persist, (a,b) => { return parseFloat(a) * parseFloat(b) }, callback);
  },
/**
 * Division operation
 * @param {object} args expects a json object with the 2 operands, see example
 * @param {bool} if true would persist the value (WIP). Not implemented in this version.
 * @param {Function} callback function, called when operation is done
 * @example add({ op1: 10, op2: 12 }, false, (result)=>{
 *   console.log(`Result of operation is ${result}`); 
 * });
 */
  div: (args, persist, callback) => {
    operation(args, persist, (a,b) => { return parseFloat(a) / parseFloat(b) }, callback);
  },
/**
 * Factorial operation
 * @param {object} args expects a json object with the 1 operand, see example
 * @param {bool} if true would persist the value (WIP). Not implemented in this version.
 * @param {Function} callback function, called when operation is done
 * @example add({ op1: 10}, false, (result)=>{
 *   console.log(`Result of operation is ${result}`); 
 * });
 */
  fact: (args, persist, callback) => {
    let v = parseInt(args[0]); //Only care about the first argument, persist is always ignored
    args = []
    while(v > 1){
      args.push(v--);
    }
    module.exports.mul(args, false, callback);
  }
}
/**
 * operation generic function. Called by every operation function. Calls recursively the add/sub/mul/div/fact
 * functions for each operand (step). Improvements on later versions could include calculating more operands and
 * persisting result. Not included in the current version.
 * @param {object} args expects a json object with the required operands
 * @param {bool} if true would persist the value (WIP). Not implemented in this version.
 * @param {Function} step callback Function which calls any of the add/sub/mul/div/fact functions
 * @param {Function} final callback Function called after calculation is over
 * @internal
 */
function operation(args, persist, calcCB, resultCB){
  if(args && args.length != 0){
  //storage.get("calcx", (err, result)=>{
    let result = 0;
    if(result) args.unshift(result); //prepends persisted result if exists
    for(let a in args){
      if (a == 0){
        result = args[0];
      } else {
        result = calcCB(result, args[a]);
      }
    }
    if (persist){
      //First makes sure the result is set and only then returns
      storage.put("calcx", result, () => { 
      //data.setLastResult(result, (valuePersisted) => {
        resultCB(result);
      });
    } else {
      resultCB(result);
    }
  } else {
    throw new Error('Please provide arguments.');
  }
}
