'use strict';

var AdmZip = require('adm-zip');
var zlib = require('zlib');
var async = require('async');

var api = {
  export: function(params, tmpFile, callback) {
    var self = this;
    var opts = {
      url: self.buildUrl('/export'),
      qs: params
    };

    var data = [];
    self.download(opts, tmpFile, function(err) {
      if (err) {
        return callback(err);
      }

      var zip = new AdmZip(tmpFile);
      var zipEntries = zip.getEntries();

      async.eachSeries(zipEntries, function(entry, cb) {
        zlib.unzip(entry.getData(), function(err, res) {
          if (err) {
            return cb(err);
          }

          var raw = res.toString('utf-8');
          var rawEntries = raw.split('\n');

          rawEntries.forEach(function(row) {
            try {
              var eventRow = JSON.parse(row);
              data.push(eventRow);
            } catch (e) {
              // do nothing here
              console.log(e);
            }
          });
          return cb();
        });
      }, function(err) {
        if (err) {
          return callback(err);
        }

        return callback(null, data);
      });
    });
  }
};

module.exports = api;
