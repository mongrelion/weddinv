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

      // TODO: Before sending the user right away to the login page,
      //       check if there isn't already a session created so that
      //       the already logged in users don't have to re-login while the
      //       session is still active (what a waste of time!).
      $rootScope.$on('$routeChangeStart', function(e, next, current) {
        if (next.loginRequired && !$scope.loggedIn) {
          $location.path('/login');
        }
      });
    }]);
}());
