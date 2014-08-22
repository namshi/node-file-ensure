/**
 * Deps
 */
var fs =  require('node-fs-extra');

/**
 * Ensure that the file specified at `path`
 * exists, else create it.
 * 
 * After the file is created, you can execute
 * the given callback, if provided.
 */
module.exports = function(path, callback) {
  if (!path || !path.toString()) {
    throw new Error('path cannot be empty');
  }
  
  fs.createFile(path.toString(), function(err){
    if (err) {
      throw err;
    }
    
    callback && callback();
  });
};