'use strict';

var AdmZip = require('adm-zip');
var zlib = require('zlib');
var async = require('async');
var fs = require('fs');
var path = require('path');

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

      var files = [];
      var tmpDir = path.dirname(tmpFile);
      var zip = new AdmZip(tmpFile);
      var zipEntries = zip.getEntries();

      // extra all
      zip.extractAllTo(tmpDir, true);

      zipEntries.forEach(function(entry) {
        files.push(path.join(tmpDir, entry.entryName));
      });

      async.eachLimit(files, 10, function(file, cb) {
        var dest = file.slice(0, -3);

        fs.createReadStream(file)
          .pipe(zlib.createUnzip())
          .pipe(fs.createWriteStream(dest))
          .on('error', function(err) {
            return cb(err);
          })
          .on('close', function() {
            data.push(dest);
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
