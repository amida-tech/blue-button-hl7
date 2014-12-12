var expect = require('chai').expect;
var assert = require('chai').assert;

var fs = require("fs");

var hl7 = require('hl7');

var bb7 = require("../index.js");

describe('parse.js test', function () {
    var data = "";

    before(function () {
        data = fs.readFileSync('./test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");
        data2 = fs.readFileSync('./test/fixtures/isabella_jones_multiple_tests.txt').toString().split("\n").join("\r");

        console.log(data);

        console.log("---");
        console.log(data2);

        console.log(JSON.stringify(hl7.parseString(data), null, 4));

    });

    it('translate', function () {
        var bb_json = bb7.translate(data);

        console.log(JSON.stringify(bb_json, null, 4));

        assert.equal('JONES', bb_json['demographics']['name']['last']);
        assert.equal('ISABELLA', bb_json['demographics']['name']['first']);

        assert.equal('Lipid Panel - C', bb_json['results'][0]['result_set']['name']);
        assert.equal(62, bb_json['results'][0]['results'][0]['value']);
        assert.equal('mg/dL', bb_json['results'][0]['results'][0]['unit']);

    });

    xit('translate #2', function () {
        var bb_json = bb7.translate(data2);

        console.log(JSON.stringify(bb_json, null, 4));

        assert.equal('JONES', bb_json['demographics']['name']['last']);
        assert.equal('ISABELLA', bb_json['demographics']['name']['first']);

        assert.equal('LIPID SCREEN (CORONARY RISK I)', bb_json['results'][0]['result_set']['name']);
        assert.equal(55, bb_json['results'][0]['results'][1]['value']);
        assert.equal('mg/dl', bb_json['results'][0]['results'][1]['unit']);

    });

});
