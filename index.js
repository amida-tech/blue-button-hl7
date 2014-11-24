'use strict';

var utils = require('./utils.js');

var hl7 = require("../hl7/index.js");

/*
{
    "name": {
        "middle": [
            "Isa"
        ],
        "last": "Jones",
        "first": "Isabella"
    },
    "dob": {
        "point": {
            "date": "1975-05-01T00:00:00Z",
            "precision": "day"
        }
    },
    "gender": "Female",
    "identifiers": [
        {
            "identifier": "2.16.840.1.113883.19.5.99999.2",
            "extension": "998991"
        },
        {
            "identifier": "2.16.840.1.113883.4.1",
            "extension": "111-00-2330"
        }
    ],
    "marital_status": "Married",
    "addresses": [
        {
            "street_lines": [
                "1357 Amber Drive"
            ],
            "city": "Beaverton",
            "state": "OR",
            "zip": "97867",
            "country": "US",
            "use": "primary home"
        }
    ],
    "phone": [
        {
            "number": "(816)276-6909",
            "type": "primary home"
        }
    ],
    "race_ethnicity": "White",
    "languages": [
        {
            "language": "en",
            "preferred": true,
            "mode": "Expressed spoken",
            "proficiency": "Good"
        }
    ],
    "religion": "Christian (non-Catholic, non-specific)",
    "birthplace": {
        "city": "Beaverton",
        "state": "OR",
        "zip": "97867",
        "country": "US"
    },

*/

function demographics(pid) {
    var dm = {};

    dm.name = {};
    dm.name.last = pid["Patient Name"][0][0];
    dm.name.first = pid["Patient Name"][0][1];

    dm.dob = {
        "point": {
            "date": utils.hl7ToISO(pid["Date/Time of Birth"][0][0]),
            "precision": utils.hl7ToPrecision(pid["Date/Time of Birth"][0][0])
        }
    };

    dm.gender = pid["Sex"][0][0];

    //MORE of the same

    return dm;
}

function results_panel(obr) {
    var r = {};

    r.result_set = {};
    r.result_set.name = obr["Universal Service ID"][0][1];

    //MORE of the same

    return [r];
}

function results_observation(obx, r) {
    //initialize results array if it doesn't exist
    if (!r[0].results) {
        r[0].results = [];
    }

    /*
            "result": {
                "name": "HGB",
                "code": "30313-1",
                "code_system_name": "LOINC"
            },
            "date_time": {
                "point": {
                    "date": "2000-03-23T14:30:00Z",
                    "precision": "minute"
                }
            },
            "status": "completed",
            "reference_range": {
                "range": "M 13-18 g/dl; F 12-16 g/dl"
            },
            "interpretations": [
                "Normal"
            ],
            "value": 13.2,
            "unit": "g/dl"
        },
    */
    //new observation
    var obs = {}
    obs.result = {};
    obs.result.name = obx["Observation Identifier"][0][1];

    obs.status = "completed"; //or obx["Observ Result Status"][0][0]; // ="F"?

    obs.value = obx["Observation Value"][0][0];
    obs.unit = obx["Units"][0][1];

    obs.date_time = {};
    obs.date_time.point = {
        "date": utils.hl7ToISO(obx["Date/Time of the Observation"][0][0]),
        "precision": utils.hl7ToPrecision(obx["Date/Time of the Observation"][0][0])
    };

    //MORE of the same


    r[0].results.push(obs);
    return r;
}


//takes HL7 data as string and translates it to Blue Button JSON
function translate(data) {
    var bb = {};

    var msg = hl7.translate(hl7.parseString(data));

    //process message by segment
    for (var seg in msg) {
        var segment = msg[seg];
        //console.log(segment);

        if (segment && segment["Segment"] === "PID") {
            bb["demographics"] = demographics(segment);
        } else if (segment && segment["Segment"] === "OBR") {
            bb["results"] = results_panel(segment);
        } else if (segment && segment["Segment"] === "OBX") {
            bb["results"] = results_observation(segment, bb["results"]);
        }

    }

    return bb;
}

exports.translate = translate;
