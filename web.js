'use strict';

/*****************************************************
 * Main Web API program
 *****************************************************/


let express = require("express");
let api = require("./lib/api");
let routes = require("./routes");
let bodyParser = require('body-parser');

let tracer = require('tracer');
let log = tracer.colorConsole({level:'info'}); //trace level
log.warning = log.warn;

/**
 * Default port of the web-server
 * @internal
 * @example let defaultPort = 3000;
 */
let defaultPort = 3000;
let app = {};

/**
 * Starts the express web server, by setting up middleware, override port if definedm setup routes and 
 * listening to the defined port, if not defined the port 3000 is used.
 * @param {object} options defines extra parameter for starting the web-server, in this case can override port
 * @param {Function} callback runs after the web-server listens to the port.
 * @return {object} the plugins object; 
 * @example start({port: 2000}, (err)={
 *   if(err) throw err;
 *   console.log("Web-server started");
 * })
 */
function start(options, callback){
  setup();
  setOptions(options);
  setupRoutes();
  listen(callback);
}

/**
 * listens to the web-server via calling the app.listen express method. In case of error outputs to the console,
 * e.g. if port is already used.
 * @param {Function} callback runs after the function runs, regardless of whether there is an error or not. In case of error sends 'true' as first parameter of the callback.
 * @internal
 */
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

/**
 * Creates the app express intance and adds middleware to handle json responses and log every request to the
 * console.
 * @internal
 */
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

/**
 * Sets options, in this case allows overriding the TCP port which the web-server listens to, otherwise the defaultPort is used
 * console.
 * @internal
 */
function setOptions(options){
  log.info("Setting web server options...");
  if (!options) return;
  if (options.port) defaultPort = options.port;
}

/**
 * Sets up the routes, see module "routes.js" for details.
 * @internal
 */
 function setupRoutes(){
  log.info("Setting up routes...");
  routes.setup(app, log); 
}

module.exports = app
app.start = start;
app.log = log;