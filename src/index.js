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
module.exports = function(path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
  }
  
  if (!path || !path.toString()) {
    throw new Error('path cannot be empty');
  }
  
  var fileExisted = fs.existsSync(path);
  
  fs.createFile(path.toString(), function(err){
    if (err) {
      throw err;
    }
    
    if (!fileExisted && options.src) {
      fs.writeFileSync(path, fs.readFileSync(options.src));
    }
    
    callback && callback();
  });
};