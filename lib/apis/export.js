'use strict';

var api = {
  export: function(params, callback) {
    var self = this;
    var opts = {
      url: self.buildUrl('/export'),
      qs: params
    };

    return self.get(opts, callback);
  }
};

module.exports = api;
