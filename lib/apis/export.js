'use strict';

var api = {
  export: function(params, tmpFile, callback) {
    var self = this;
    var opts = {
      url: self.buildUrl('/export'),
      qs: params
    };

    return self.download(opts, tmpFile, callback);
  }
};

module.exports = api;
