'use strict';

let data = require("./data")

module.exports = {
  add: (args) => {
  	return operation(args, (a,b) => { return parseFloat(a) + parseFloat(b) });
  },
  sub: (args) => {
  	return operation(args, (a,b) => { return parseFloat(a) - parseFloat(b) });
  },
  mul: (args) => {
    return operation(args, (a,b) => { return parseFloat(a) * parseFloat(b) });
  },
  div: (args) => {
    return operation(args, (a,b) => { return parseFloat(a) / parseFloat(b) });
  },
  fact: (args) => {
    args.splice(1); //Only care about the first argument
    if(args[0] > 0){
      args.push(module.exports.fact([args[0]-1]));
      return module.exports.mul(args);
    }
    return 1;
  }
}

function operation(args, callback){
  let result = data.getLastResult();
  for(let a in args){
    if (a == 0){
      result = args[0];
    } else {
      result = callback(result, args[a]);
    }
  }
  return result;
}
