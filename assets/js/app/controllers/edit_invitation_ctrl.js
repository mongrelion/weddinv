(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('EditInvitationCtrl', ['$scope', '$routeParams', '$location', 'Invitation', function($scope, $params, $location, Invitation) {
      Invitation.one('invitations', $params.id).get().then(function(invitation) {
        $scope.invitation = invitation;
      }, function() {
        $location.path('/invitations');
      });

      $scope.save = function() {
        $scope.invitation.put().then(function() {
          $location.path('/invitations');
        }, function() {
          alert('Something went wrong');
        });
      };
    }]);
}());
