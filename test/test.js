var expect = require('chai').expect;
var assert = require('chai').assert;

var fs = require("fs");

var bb7 = require("../index.js");

describe('parse.js test', function () {
    var data = "";

    before(function () {
        data = fs.readFileSync('./test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");
        data2 = fs.readFileSync('./test/fixtures/isabella_jones_multiple_tests.txt').toString().split("\n").join("\r");

        console.log(fs.readFileSync('./test/fixtures/isabella_jones_lipid_panel.txt').toString());

        console.log(fs.readFileSync('./test/fixtures/isabella_jones_multiple_tests.txt').toString());

    });

    it('should work', function () {
        assert.notStrictEqual(undefined, bb7.translate(data));
    });

    it('translate', function () {
        var bb = bb7.translate(data);

        console.log(JSON.stringify(bb, null, 4));

        assert.equal('JONES', bb['demographics']['name']['last']);
        assert.equal('ISABELLA', bb['demographics']['name']['first']);

        assert.equal('Lipid Panel - C', bb['results'][0]['result_set']['name']);
        assert.equal(62, bb['results'][0]['results'][0]['value']);
        assert.equal('mg/dL', bb['results'][0]['results'][0]['unit']);

    });

    it('translate #2', function () {
        var bb = bb7.translate(data2);

        console.log(JSON.stringify(bb, null, 4));

        assert.equal('JONES', bb['demographics']['name']['last']);
        assert.equal('ISABELLA', bb['demographics']['name']['first']);

        assert.equal('LIPID SCREEN (CORONARY RISK I)', bb['results'][0]['result_set']['name']);
        assert.equal(55, bb['results'][0]['results'][1]['value']);
        assert.equal('mg/dl', bb['results'][0]['results'][1]['unit']);

    });

});
