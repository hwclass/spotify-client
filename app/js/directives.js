define(function (require) {
  'use strict';
  require('angular').module('app.directives', []).
    directive('appVersion', require('directive/version_directive'));
});
