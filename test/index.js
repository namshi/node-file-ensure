var ensure  = require('../src/index.js');
var fs      = require('fs');
var assert  = require('assert');
var unlink  = function(what) {
  try {
    fs.unlinkSync(what);
  }  catch (err){};
}

describe('ensure', function(){
  describe('#()', function(){
    it('should not be called without arguments', function(){
      assert.throws(
        ensure,
        Error
      );
    })
    
    it('should create a file if it doesnt exist', function(done){
      unlink('./i-dont-exist.log');
      
      ensure('./i-dont-exist.log', function(){
        fs.readFileSync('./i-dont-exist.log');
        done();
      });
    })
    
    it('should be able to create a file from an existing file', function(done){
      unlink('./i-dont-exist.log');
      
      ensure('./i-dont-exist.log', {src: './package.json'}, function(){
        var check = fs.readFileSync('./i-dont-exist.log');
        
        assert.equal(check.toString(), fs.readFileSync('./package.json').toString());
        done();
      });
    })
    
    it('should not be able to copy if the ensured file already exists', function(){
      ensure('./package.json', {src: './README.md'}, function(){
        var check = fs.readFileSync('./README.md');
        
        assert.equal(false, check.toString() === fs.readFileSync('./package.json').toString());
      });
    })
    
    it('should not override a file if it already exists', function(){
      var content = fs.readFileSync('./package.json');
      
      ensure('./package.json', function(){
        var check = fs.readFileSync('./package.json');
        
        assert.equal(check.toString(), content.toString());
      });
    })
  })
})