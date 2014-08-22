## file-ensure

[![Build Status](https://magnum.travis-ci.com/namshi/file-ensure.svg?token=MxqAgNuVLsuCrtxWfKzR&branch=master)](https://magnum.travis-ci.com/namshi/file-ensure)

Simply ensure that a file exists, else create it: this becomes handy
when you provide skeleton file, like `config_dev.yml.example` that should
be ignored in git but need to be available in your FS to run your
application.

## Installation

As usual, this module is provided through
[NPM](https://www.npmjs.org/package/file-ensure):

```
npm install file-ensure
```

## Usage

The mdule's usage is straightforward:

```
ensure(filePath, options, callback)

# or

ensure(filePath, callback)
```

Simply require and use it for every file 
you want to make sure that exists in 
your filesystem:

``` javascript
var ensure = require('file-ensure');

ensure('path/to/config_dev.yml');
```

Simple as that :)

You can also create the file from another file:

``` javascript
ensure('path/to/config_dev.yml', {src: 'path/to/config_dev.yml.example'}, function(err){
  console.log(fs.readFileSync('path/to/config_dev.yml').toString() === fs.readFileSync('path/to/config_dev.yml.example').toString());
});
```

## Tests

This small library is tested through mocha, while
automated tests run on [travis](https://travis-ci.org/namshi/file-ensure).
