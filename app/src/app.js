/*
 * Main app initializer for the whole app as a mediator
*/

(function () {

  'use strict';

  /*===MODULES===*/
  require('angular');
  require('angular-route');
  //require('angular-animate');
  require('angular-module-cookies');

  /*===SERVICES===*/
  //var TestService = require('./service/TestService');

  /*===CONTROLLERS===*/
  var TestController = require('./section/test/controller/TestController');
  //var ProductListController = require('./section/productList/controller/ProductListController');

  /*===DIRECTIVES===*/
  //var TestComponent = require('./component/TestComponent');
  var songWidgetComponent = require('./section/test/component/SongWidgetComponent');

  angular.module('SpotifyClient', ['ngRoute', 'ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/saySomethingToPlay', {
        templateUrl : './src/section/test/partial/test.html',
        controller : 'TestController'
      })
      .otherwise({
        redirectTo: '/saySomethingToPlay'
    });
  }])
  .controller('TestController', ['$scope', '$http', TestController])
  .directive('songwidgetcomponent', [songWidgetComponent]);
  /*
  .controller('ProductListController', ['$scope', '$http', '$cookieStore', ProductListController])
  .factory('TestService', ['$http', TestService])
  .directive('TestComponent', [TestComponent]);
  */

})();
