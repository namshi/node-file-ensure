'use strict';

/**
 * Deps
 */
var fs =  require('fs');

function createRequiredFile(path, source, callback) {
  if (callback && typeof callback === 'function') {
    fs.writeFile(path, source, callback);
  } else {
    fs.writeFileSync(path, source);
  }
}

/**
 * Ensure that the file specified at `path`
 * exists, else create it.
 *
 * After the file is created, you can execute
 * the given callback, if provided.
 */
module.exports = function(path, options, callback) {
  options = options || {};
  callback = callback || null;

  if (typeof options === 'function') {
    callback = options;
  }

  var source = (options.from) ? fs.readFileSync(options.from) : '';

  if (!path || !path.toString()) {
    throw new Error('path cannot be empty');
  }

  if (!fs.existsSync(path)) {
    createRequiredFile(path, source, callback)
  } else {
    callback && callback();
  }
};