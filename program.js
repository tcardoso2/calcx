'use strict';

let cli = require("commander");
let api = require("./lib/api");


cli
  .option('-a, --add', 'Performs an arithmetic addition of the provided list of values (space separated).')
  .option('-s, --sub', "Performs an arithmetic subtraction of the provided list of values (space separated)..")
  .option('-m, --mul', "Performs an arithmetic multiplication of the provided list of values (space separated)..")
  .option('-d, --div', "Performs an arithmetic division of the provided list of values (space separated)..")
  .option('-f, --fact', "Performs a factorial calculation of the provided first integer value, ignoring if more than one value is provied. Value must be an integer.")
  .parse(process.argv);

if (cli.add){
  console.log(api.add(cli.args));
}else{ 
  if(cli.sub){
    console.log(api.sub(cli.args));
  }else{
  	if(cli.mul){
      console.log(api.mul(cli.args));
    }else{
      if(cli.div){
        console.log(api.div(cli.args));
      }else{
        if(cli.fact){
          console.log(api.fact(cli.args));
        }else{
          console.log('calcx calculator CLI tool. type --help for command-line usage.');
        }
      }
    }
  }
}
