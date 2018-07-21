#!/usr/bin/env node

'use strict';

var exec = require('child_process').exec;
function log(error, stdout, stderr) { console.log(stdout) }
exec("ls -la", log);
