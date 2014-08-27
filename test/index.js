var ensure  = require('../src/index.js');
var fs      = require('fs');
var assert  = require('assert');

function unlink(what) {
  try {
    fs.unlinkSync(what);
  }  catch (err){}
}

describe('ensure', function(){
  describe('#Async()', function(){
    it('should not be called without arguments', function(){
      assert.throws(
        ensure,
        Error
      );
    });

    it('should create a file if it doesnt exist', function(done){
      unlink('./i-dont-exist.log');

      ensure('./i-dont-exist.log', function(){
        assert.ok(fs.existsSync('./i-dont-exist.log'), 'File was not created');
        done();
      });
    });

    it('should be able to create a file from an existing file', function(done){
      unlink('./i-dont-exist.log');

      ensure('./i-dont-exist.log', {from: './package.json'}, function(){
        var check = fs.readFileSync('./i-dont-exist.log');

        assert.equal(check.toString(), fs.readFileSync('./package.json').toString(), 'Files are not equal');
        done();
      });
    });

    it('should not be able to copy if the ensured file already exists', function(done){
      ensure('./package.json', {from: './README.md'}, function(){
        var check = fs.readFileSync('./README.md');

        assert.equal(false, check.toString() === fs.readFileSync('./package.json').toString(), 'Did copy the file.');
        done();
      });
    });

    it('should not override a file if it already exists', function(done){
      var content = fs.readFileSync('./package.json');

      ensure('./package.json', function(){
        var check = fs.readFileSync('./package.json');

        assert.equal(check.toString(), content.toString(), 'Did override the file');
        done();
      });
    })
  });

  describe('#Sync()', function(){
    it('should not be called without arguments', function(){
      assert.throws(
        ensure,
        Error
      );
    });

    it('should create a file if it doesnt exist', function(){
      unlink('./i-dont-exist.log');

      ensure('./i-dont-exist.log');

      assert.ok(fs.existsSync('./i-dont-exist.log'), 'File was not created');
    });

    it('should be able to create a file from an existing file', function(){
      unlink('./i-dont-exist.log');

      ensure('./i-dont-exist.log', {from: './package.json'});

      var check = fs.readFileSync('./i-dont-exist.log');
      assert.equal(check.toString(), fs.readFileSync('./package.json').toString(), 'Files are not equal');
    });

    it('should not be able to copy if the ensured file already exists', function(){
      ensure('./package.json', {from: './README.md'});

      var check = fs.readFileSync('./README.md');
      assert.equal(false, check.toString() === fs.readFileSync('./package.json').toString(), 'Did copy the file.');
    });

    it('should not override a file if it already exists', function(){
      var content = fs.readFileSync('./package.json');

      ensure('./package.json');

      var check = fs.readFileSync('./package.json');
      assert.equal(check.toString(), content.toString(), 'Did override the file');
    })
  })
});