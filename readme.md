# jsftp-lsr [![Build Status](https://travis-ci.org/firerap/jsftp-lsr.svg?branch=master)](https://travis-ci.org/firerap/jsftp-lsr)

> Recursively get nested files with [jsftp](https://github.com/sergi/jsftp), like ls -R

> Each directory has a property 'children' with nested files.

## Install

```
$ npm install --save jsftp-lsr
```


## Usage

```js
var JSFtp = require('jsftp');

// decorate `JSFtp` with a new method `lsr`
JSFtp = require('jsftp-lsr')(JSFtp);

var path = 'public_html/deploy/foo';

ftp.lsr(path, function (err) {
	console.log('Created path:', path);
});
```

## Return example
```json
[
  {
    "name": "bar",
    "type": 1,
    "time": 1462024620000,
    "size": "102",
    "owner": "ivan",
    "group": "staff",
    "userPermissions": {
      "read": true,
      "write": true,
      "exec": true
    },
    "groupPermissions": {
      "read": true,
      "write": false,
      "exec": true
    },
    "otherPermissions": {
      "read": true,
      "write": false,
      "exec": true
    },
    "children": [
      {
        "name": "test.txt",
        "type": 0,
        "time": 1462024620000,
        "size": "4",
        "owner": "ivan",
        "group": "staff",
        "userPermissions": {
          "read": true,
          "write": true,
          "exec": false
        },
        "groupPermissions": {
          "read": true,
          "write": false,
          "exec": false
        },
        "otherPermissions": {
          "read": true,
          "write": false,
          "exec": false
        }
      }
    ]
  },
  {
    "name": "baz",
    "type": 1,
    "time": 1462024620000,
    "size": "68",
    "owner": "ivan",
    "group": "staff",
    "userPermissions": {
      "read": true,
      "write": true,
      "exec": true
    },
    "groupPermissions": {
      "read": true,
      "write": false,
      "exec": true
    },
    "otherPermissions": {
      "read": true,
      "write": false,
      "exec": true
    },
    "children": []
  }
]
```


## API

### JSFtp.lsr(path, callback)

#### path

*Required*  
Type: `string`

Path of the directory which you want to see.


## License

MIT © [Ivan Drondov](http://github.com/firerap)
