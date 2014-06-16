'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
    	/* Here is where the Phone object is instantiated.  The data is
    	 * obtained from JSON schema
    	 */
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
