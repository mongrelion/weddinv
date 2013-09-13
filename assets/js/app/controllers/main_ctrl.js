(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('MainCtrl', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
      $scope.loggedIn = false;

      $scope.$on('session:login', function() {
        $scope.loggedIn = true;
      });

      $scope.$on('session:logout', function() {
        $scope.loggedIn = false;
      });

      $rootScope.$on('$routeChangeStart', function(e, next, current) {
        if (next.loginRequired && !$scope.loggedIn) {
          $location.path('/login');
        }
      });
    }]);
}());
