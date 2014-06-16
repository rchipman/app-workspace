'use strict';

/* Controllers -- aka the model */

var phonecatControllers = angular.module('phonecatControllers', []);
/* creation of new module phonecatControllers, array is for 
 * listing additional modules required if necessary */
phonecatControllers.controller('PhoneGistCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
    /* The Phone.query call is updating the array of phones to be displayed later from another object
     * The orderProp assignment is setting the default sorting condition
     */
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
/* These last bits are defining 'controller' functions that appear to 
 * handle how the phone objects are instantiated -- look more on that later */