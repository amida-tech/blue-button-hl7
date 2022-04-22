var fs = require("fs");

var hl7 = require('@amida-tech/hl7');

var bb7 = require("../index.js");

describe('parse.js test', function () {
  var data = "",
    data2 = "";

  beforeAll(function () {
    data = fs.readFileSync('./test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");
    data2 = fs.readFileSync('./test/fixtures/isabella_jones_multiple_tests.txt').toString().split("\n").join("\r");

    //console.log(data);

    //console.log("---");
    //console.log(data2);

    //console.log(JSON.stringify(hl7.parseString(data), null, 4));

  });

  it('translate', function () {
    var bb_json = bb7.translate(data);

    //console.log(JSON.stringify(bb_json, null, 4));

    expect('JONES').toEqual(bb_json['demographics']['name']['last']);
    expect('ISABELLA').toEqual(bb_json['demographics']['name']['first']);

    expect('Lipid Panel - C').toEqual(bb_json['results'][0]['result_set']['name']);
    expect('62').toEqual(bb_json['results'][0]['results'][0]['value']);
    expect('mg/dL').toEqual(bb_json['results'][0]['results'][0]['unit']);

  });

  it('translate #2', function () {
    var bb_json = bb7.translate(data2);

    //console.log(JSON.stringify(bb_json, null, 4));

    expect('JONES').toEqual(bb_json['demographics']['name']['last']);
    expect('ISABELLA').toEqual(bb_json['demographics']['name']['first']);

    expect('LIPID SCREEN (CORONARY RISK I)').toEqual(bb_json['results'][0]['result_set']['name']);
    expect('55').toEqual(bb_json['results'][0]['results'][1]['value']);
    expect('mg/dl').toEqual(bb_json['results'][0]['results'][1]['unit']);

  });

});
