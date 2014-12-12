'use strict';

var fs = require('fs');
var tr = require('./index.js');

//var data = fs.readFileSync('../hl7/test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");
var data = fs.readFileSync('../hl7/test/fixtures/isabella_jones_multiple_tests.txt').toString().split("\n").join("\r");

var bb = tr.translate(data);

console.log(JSON.stringify(bb, null, 4));
