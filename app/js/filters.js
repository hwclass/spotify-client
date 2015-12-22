define(function (require) {
  'use strict';
  require('angular').module('app.filters', []).
    filter('interpolate', require('filter/version_filter'));
});
