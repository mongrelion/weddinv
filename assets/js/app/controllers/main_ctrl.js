(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('MainCtrl', ['$rootScope', '$scope', '$location', 'Session', function($rootScope, $scope, $location, Session) {
      $scope.loggedIn = false;
      Session.isLoggedIn(function() {
        $scope.loggedIn = true;
      });

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
