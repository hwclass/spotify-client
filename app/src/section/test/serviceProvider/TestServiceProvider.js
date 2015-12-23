/**
 * @name AddressServiceProvider
 * @desc AddressServiceProvider provider
 */

 'use strict';

/*===SERVICES===*/
var TestService = require('../service/TestService');

console.log(TestService);

/**
 * @name AddressServiceProvider
 * @desc Service provider for AddressService
 */
var TestServiceProvider = function ($http) {

  return(function () {

    return {

      /**
      * @name getCities
      * @ref testRequest
      * @desc Does something awesome
      * @param {Function} callback - Callback after response returns
      * @returns {undefined}
      */
      getCities : function (callback) {
        TestService($http).getCities(function (data) {
          callback(data);
        });
      }

    }

  })();

}

module.exports = TestServiceProvider;
