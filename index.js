'use strict';

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
    dm.name.first = pid["Patient Name"][0][0];
    dm.name.last = pid["Patient Name"][0][1];

    dm.dob = {
        "point": {
            "date": pid["Date/Time of Birth"][0][0],
            "precision": "day"
        }
    };

    dm.gender = pid["Sex"][0][0];

    //MORE of the same

    return dm;
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
        }

    }

    return bb;
}

exports.translate = translate;
