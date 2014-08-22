var ensure  = require('../src/index.js');
var fs      = require('fs');
var assert  = require('assert');

describe('ensure', function(){
  describe('#()', function(){
    it('should not be called without arguments', function(){
      assert.throws(
        ensure,
        Error
      );
    })
    
    it('should create a file if it doesnt exist', function(){
      try {
        fs.readFileSync('./i-dont-exist.log');
        
        assert.fail(0, 1, 'The file should not pre-exist');
      } catch (err) {
        ensure('./i-dont-exist.log', function(){
          fs.readFileSync('./i-dont-exist.log');
        });
      }
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