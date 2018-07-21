'use strict';

/*****************************************************
 * Main Web API program
 *****************************************************/


let express = require("express");
let api = require("./lib/api");
let routes = require("./routes");
let tracer = require('tracer');
let bodyParser = require('body-parser');
let log = tracer.colorConsole({level:'info'}); //trace level
log.warning = log.warn;

let defaultPort = 3000;
let app = {};

/**
 * Starts the express web server
 * @return {object} the plugins object; 
 */
function start(options, callback){
  setup();
  setOptions(options);
  setupRoutes();
  listen(callback);
}

function listen(callback){
  log.info(`Listening to port ${defaultPort}...`);
  try{
    app.listen(defaultPort, ()=>{
	    console.log("##########################################################");
	    console.log("########## CALCX - Web API started Successfully ##########");
	    console.log("##########################################################");
	    callback(false);
    }).on('error', (err)=>{
	    log.error(`Some error happened, details: ${err}`);
	    callback(true);
    })
   }catch(e){
   	 log.fatal(e.message);
     callback(true);
   }
}

function setup(){
  log.info("Creating express instance...");
  app = express();
  log.info("Adding middleware...");
  //Middlewares for being able to parse content in required format, in this case, json
  app.use(bodyParser.json());                                     
  app.use(bodyParser.urlencoded({extended: true}));               
  app.use(bodyParser.text());                                    
  app.use(bodyParser.json({ type: 'application/json'}));  
  //Middleware for logs
  app.use(function(req, res, next) {
    log.info(`Received ${req.method} request to ${req.url}`);
    next();
  });
}

function setOptions(options){
  log.info("Setting web server options...");
  if (!options) return;
  if (options.port) defaultPort = options.port;
}

function setupRoutes(){
  log.info("Setting up routes...");
  routes.setup(app, log); 
}

module.exports = app
app.start = start;
app.log = log;