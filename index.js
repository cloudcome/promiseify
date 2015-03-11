'use strict';

/**
 * promiseify
 * @param {function} method function
 * @param {object} ctx optional ctx for method
 */
function promiseify(method, ctx) {

  return function() {

    var args = [].slice.call(arguments);
    return new Promise(function(resolve, reject) {

      args.push(function(err) {
        if (err) {
          return reject(err);
        }
        var arg = [].slice.call(arguments);
        resolve.apply(this, arg.slice(1));
      });

      method.apply(ctx, args);

    });
  };
}

module.export = promiseify;