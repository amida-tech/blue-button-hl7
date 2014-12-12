blue-button-hl7
==========

HL7 to Blue Button JSON translation


##Usage

```
var fs = require('fs');
var tr = require('./index.js');

//var data = fs.readFileSync('../hl7/test/fixtures/isabella_jones_lipid_panel.txt').toString().split("\n").join("\r");
var data = fs.readFileSync('../hl7/test/fixtures/isabella_jones_multiple_tests.txt').toString().split("\n").join("\r");

var bb = tr.translate(data);

//Print Blue Button JSON result
console.log(JSON.stringify(bb, null, 4));
```

###Prerequisites

- Node.js (v0.10+) and NPM
- Grunt.js

```
# you need Node.js and Grunt.js installed

#install dependencies and build
npm install
grunt

```

## Contributing

Contributors are welcome. See issues https://github.com/amida-tech/blue-button-hl7/issues

## Release Notes

See release notes [here] (./RELEASENOTES.md)

## License

Licensed under [Apache 2.0](./LICENSE)
