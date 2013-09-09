(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('MainCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'Session', function($rootScope, $scope, $location, $timeout, Session) {
      var sessionReady;
      $scope.loggedIn = false;

      Session.isLoggedIn(function() {
        sessionReady    = true;
        $scope.loggedIn = true;
      }, function() {
        sessionReady = true;
      });

      $scope.$on('session:login', function() {
        $scope.loggedIn = true;
      });

      $scope.$on('session:logout', function() {
        $scope.loggedIn = false;
      });

      var intervalId = window.setInterval(function() {
        if (sessionReady) {
          $rootScope.$on('$routeChangeStart', function(e, next, current) {
            if (next.loginRequired && !$scope.loggedIn) {
              $location.path('/login');
            }
          });
          clearInterval(intervalId);
        }
      }, 1000);
    }]);
}());
