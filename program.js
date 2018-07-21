#!/usr/bin/env node

'use strict';

/*****************************************************
 * Main CLI program
 *****************************************************/


let cli = require("commander");
let api = require("./lib/api");
var cache = require('persistent-cache');
let storage = cache();
let webapi = require("./web");


cli
  .option('-a, --add', 'Performs an arithmetic addition of the provided list of values (space separated).')
  .option('-s, --sub', "Performs an arithmetic subtraction of the provided list of values (space separated).")
  .option('-m, --mul', "Performs an arithmetic multiplication of the provided list of values (space separated).")
  .option('-d, --div', "Performs an arithmetic division of the provided list of values (space separated).")
  .option('-f, --fact', "Performs a factorial calculation of the provided first integer value, ignoring if more than one value is provied. Value must be an integer.")
  .option('-p, --persist', "If set, it persists the result in the environment and next calculation picks it up")
  .option('-c, --clear', "Clears any previously persisted value")
  .option('-w, --web', "Start the Web API, override the port with --port <port_number>")
  .option('--port', "override the port number, default is 3000")  
  .parse(process.argv);

for (let arg in cli.args){
  if (isNaN(cli.args[arg])){
    throw new Error("Arguments can only be numbers!");
  }
}

if (cli.add){
  api.add(cli.args, cli.persist, (value)=>{
    console.log(value);
  });
}else{ 
  if(cli.sub){
    api.sub(cli.args, cli.persist, (value)=>{
      console.log(value);
    });
  }else{
  	if(cli.mul){
      api.mul(cli.args, cli.persist, (value)=>{
        console.log(value);
      });
    }else{
      if(cli.div){
        api.div(cli.args, cli.persist, (value)=>{
          console.log(value);
        });
      }else{
        if(cli.fact){
          api.fact(cli.args, false, (value)=>{  //factorial never takes in persisted values
            console.log(value);
          });
        }else{
          if(cli.clear){
            storage.put("calcx", 0, () =>{
              //process.exit(0);
            });
          }else{
            if(cli.web){
              let options = {};
              if (cli.port && cli.args.length > 0){
                options.port = parseInt(cli.args[0]);
              }
              //console.log(cli);
              webapi.start(options, ()=>{
                
              });
            }else{
              console.log('calcx calculator CLI tool. type --help for command-line usage.');
            }
          }
        }
      }
    }
  }
}
