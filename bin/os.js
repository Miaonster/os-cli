#!/usr/bin/env node

'use strict';

process.title = "os-cli";

var os = require('../index.js');

os(function(error, info) {
    
    console.log(
        info.name.magenta.bold,
        info.version.magenta.bold,
        '(' + info.kernel, info.kernelVersion + ')'
    );
  
})