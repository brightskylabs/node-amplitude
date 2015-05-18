'use strict';

var api = {
  useractivity: function(params, callback) {
    var self = this;
    var opts = {
      url: self.buildUrl('/useractivity'),
      qs: params
    };

    return self.get(opts, callback);
  }
};

module.exports = api;
