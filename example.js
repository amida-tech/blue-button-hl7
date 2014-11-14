'use strict';

var fs = require('fs');
var tr = require('./index.js');

var data = fs.readFileSync('../hl7/test/fixtures/sample4.txt').toString().split("\n").join("\r");

var bb = tr.translate(data);

console.log(JSON.stringify(bb, null, 4));
