(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('SessionsCtrl', ['$scope', '$location', 'Session', 'Restangular', function($scope, $location, Session, Restangular) {
      window.Restangular = Restangular;
      $scope.loginFailed = false;

      $scope.login = function() {
        Session.
          login($scope.username, $scope.password).
          then(function() {
            // This is in case the login was successfull.
            $scope.loginFailed = false;
            $location.path('/invitations');
          }, function() {
            // This is in case the login was not successfull.
            $scope.loginFailed = true;
          });
      };

      $scope.logout = function() {
        Session.logout();
      };
    }]);
}());
