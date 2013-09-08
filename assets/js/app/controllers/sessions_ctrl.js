(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('SessionsCtrl', ['$scope', '$location', 'Session', function($scope, $location, Session) {
      $scope.loginFailed = false;

      $scope.login = function() {
        Session.login($scope.username, $scope.password, function() {
          $scope.$emit('session:login');
          $scope.loginFailed = false;
          $location.path('/invitations');
        }, function() {
          $scope.loginFailed = true;
        });
      };

      $scope.logout = function() {
        Session.
          logout().
          then(function() {
            $scope.$emit('session:logout');
            $location.path('/login');
          });
      };
    }]);
}());
