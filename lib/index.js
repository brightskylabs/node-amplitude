'use strict';

var _ = require('underscore');
var request = require('request');
var API = 'https://amplitude.com/api/2';

var mixIns = [
  'dashboard',
  'export'
];

function Amplitude(options) {
  var self = this;

  self.key = options.key;
  self.secret = options.secret;

  mixIns.forEach(function(api) {
    var mixIn = require('./apis' + api);

    self[api] = Object.create(self);
    _.extend(self[api], mixIn);
  });

  return self;
}

_.extend(Amplitude.prototype, {
  req: function(opts) {
    var defaults = {
      json: true,
      auth: {
        user: this.key,
        pass: this.secret
      }
    };

    opts = _.defaults(opts, defaults);
    return request.defaults(opts);
  },
  get: function(opts, callback) {
    if (typeof callback === 'undefined') {
      callback = opts;
      opts = {};
    }

    var req = this.req(opts);
    req.get(opts, function(err, res, body) {
      if (err) {
        return callback(err);
      }

      if (res.statusCode !== 201 && res.statusCode !== 200) {
        return callback('Problem with request: \n' + JSON.stringify(body, null, 2));
      }

      return callback(null, body);
    });
  },

  put: function(opts, callback) {
    if (typeof callback === 'undefined') {
      callback = opts;
      opts = {};
    }

    var req = this.req(opts);
    req.put(opts, function(err, res, body) {
      if (err) {
        return callback(err);
      }

      if (res.statusCode !== 201 && res.statusCode !== 200) {
        return callback('Problem with request:\n' + JSON.stringify(body, null, 2));
      }

      return callback(null, body);
    });
  },

  post: function(opts, callback) {
    var req = this.req(opts);

    req.post(opts, function(err, res, body) {
      if (err) {
        return callback(err);
      }
      if (res.statusCode !== 201 && res.statusCode !== 200) {
        return callback('Problem with request:\n' + JSON.stringify(body, null, 2));
      }

      return callback(null, body);
    });
  },

  del: function(opts, callback) {
    var req = this.req(opts);

    req.del(opts, function(err, res, body) {
      if (err) {
        return callback(err);
      }
      if (res.statusCode !== 200 &&
        res.statusCode !== 201 &&
        res.statusCode !== 204) {
        return callback('Problem with request:\n' + JSON.stringify(body, null, 2));
      }

      return callback(null, body);
    });
  },

  buildUrl: function(path) {
    return API + path;
  }
});

module.exports = Amplitude;
