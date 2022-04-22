Blue Button HL7
==========

HL7 to Blue Button JSON translation

[![NPM](https://nodei.co/npm/@amida-tech/blue-button-hl7.png)](https://nodei.co/npm/@amida-tech/blue-button-hl7/)

[![Build Status](https://travis-ci.org/amida-tech/blue-button-hl7.svg)](https://travis-ci.com/amida-tech/blue-button-hl7)
[![Coverage Status](https://coveralls.io/repos/amida-tech/blue-button-hl7/badge.png)](https://coveralls.io/r/amida-tech/blue-button-hl7)

## Quick up and running guide

### Prerequisites

- Node.js (v14.19+) and NPM
- Grunt.js

```sh
# Install dependencies
npm i

# Install grunt
npm i -g grunt

# Test
grunt
```

## Usage

```javascript
var fs = require('fs');
var tr = require('./index.js');

//var data = fs.readFileSync('../hl7/test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");
var data = fs.readFileSync('../hl7/test/fixtures/isabella_jones_multiple_tests.txt').toString().split("\n").join("\r");

var bb = tr.translate(data);

//Print Blue Button JSON result
console.log(JSON.stringify(bb, null, 4));
```

## Contributing

Contributors are welcome. See issues https://github.com/amida-tech/blue-button-hl7/issues

## Release Notes

See release notes [here](./RELEASENOTES.md)

## License

Licensed under [Apache 2.0](./LICENSE)
