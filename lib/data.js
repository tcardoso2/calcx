'use strict';

let cmd=require('node-cmd');


module.exports = {
  resetLastResult: (cb, verbose) => {
  	setupPersist(cb, verbose);
  },
  getLastResult: (callback) => {
  	if(process.env.CALCX_LAST_RESULT == null){
  	  setupPersist(()=>{
	  	callback(parseFloat(process.env.CALCX_LAST_RESULT));
  	  });
  	} else {
  	  console.log(`Value exists ${process.env}`);
	  callback(parseFloat(process.env.CALCX_LAST_RESULT));
  	}
  },
  setLastResult: (result, callback) => {
  	process.env.CALCX_LAST_RESULT = result;
  	console.log(`(Saved result ${process.env.CALCX_LAST_RESULT})`);
  	if (callback) callback(process.env.CALCX_LAST_RESULT);
  }
}

function setupPersist(callback, verbose = false){
  delete process.env.CALCX_LAST_RESULT;
  let cmdWin = "SET CALCX_LAST_RESULT=0";
  let cmdOSX = "export CALCX_LAST_RESULT=0";
  cmd.get(cmdOSX,
    function(err, data, stderr){
      if (verbose) console.log(`Setting environment variable result '${cmdOSX}': ${err}`);
      cmd.get(cmdWin, function(err, data, stderr){
        if (verbose) console.log(`Setting environment variable result '${cmdWin}': ${err}`);
        module.exports.setLastResult(0, (value)=>{
          if (callback) callback(err, data, stderr, value);
        });
      });
    });
}