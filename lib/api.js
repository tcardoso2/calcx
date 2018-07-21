'use strict';

var cache = require('persistent-cache');
let storage = cache();

//When result is done a callback should be done passing the final result
module.exports = {
  add: (args, persist, callback) => {
    operation(args, persist, (a,b) => { return parseFloat(a) + parseFloat(b) }, callback); 
  },
  sub: (args, persist, callback) => {
  	operation(args, persist, (a,b) => { return parseFloat(a) - parseFloat(b) }, callback);
  },
  mul: (args, persist, callback) => {
    operation(args, persist, (a,b) => { return parseFloat(a) * parseFloat(b) }, callback);
  },
  div: (args, persist, callback) => {
    operation(args, persist, (a,b) => { return parseFloat(a) / parseFloat(b) }, callback);
  },
  fact: (args, persist, callback) => {
    let v = parseInt(args[0]); //Only care about the first argument, persist is always ignored
    args = []
    while(v > 1){
      args.push(v--);
    }
    module.exports.mul(args, false, callback);
  }
}

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
