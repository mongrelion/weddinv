(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('NewInvitationCtrl', ['$scope', '$location', 'Invitation', function($scope, $location, Invitation) {
      $scope.save = function() {
        var params = { invitation : $scope.invitation };
        Invitation.
          post(params).
          then(function() {
            $location.path('/invitations');
          });
      };
    }]);
}());
