"use strict";
Object.defineProperties(exports, {
  fileCacheHandler: {get: function() {
      return fileCacheHandler;
    }},
  makeFileCacheHandler: {get: function() {
      return makeFileCacheHandler;
    }},
  __esModule: {value: true}
});
var $__quiver_45_component__,
    $__crypto__,
    $__file_45_stats_46_js__;
var simpleHandler = ($__quiver_45_component__ = require("quiver-component"), $__quiver_45_component__ && $__quiver_45_component__.__esModule && $__quiver_45_component__ || {default: $__quiver_45_component__}).simpleHandler;
var crypto = ($__crypto__ = require("crypto"), $__crypto__ && $__crypto__.__esModule && $__crypto__ || {default: $__crypto__}).default;
var createHash = crypto.createHash;
var fileStatsFilter = ($__file_45_stats_46_js__ = require("./file-stats.js"), $__file_45_stats_46_js__ && $__file_45_stats_46_js__.__esModule && $__file_45_stats_46_js__ || {default: $__file_45_stats_46_js__}).fileStatsFilter;
var hash = (function(string) {
  var checksum = createHash('md5');
  checksum.update(string);
  return checksum.digest('hex');
});
var fileCacheHandler = simpleHandler((function(args) {
  var $__3 = args,
      filePath = $__3.filePath,
      fileStats = $__3.fileStats;
  var cacheId = hash(filePath);
  var lastModified = fileStats.mtime;
  return {
    cacheId: cacheId,
    lastModified: lastModified
  };
}), 'void', 'json').addMiddleware(fileStatsFilter);
var makeFileCacheHandler = fileCacheHandler.privatizedConstructor();
