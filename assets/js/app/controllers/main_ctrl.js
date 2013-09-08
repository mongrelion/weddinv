(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('MainCtrl', ['$scope', 'Session', function($scope, Session) {
      Session.isLoggedIn(function() {
        $scope.loggedIn = true;
      }, function() {
        $scope.loggedIn = false;
      });

      $scope.$on('session:login', function() {
        $scope.loggedIn = true;
      });

      $scope.$on('session:logout', function() {
        $scope.loggedIn = false;
      });
    }]);
}());
