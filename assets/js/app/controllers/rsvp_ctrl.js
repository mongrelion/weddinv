(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('RsvpCtrl', ['$scope', '$routeParams', 'Invitation', function($scope, $params, Invitation) {
      var exportInvitation = function(invitation) {
        $scope.invitation = invitation;
      };

      $scope.invitation = Invitation.
        one('invitations', $params.id).
        get().
        then(function(invitation) {
          if (invitation.isPending() && invitation.attending_plus_one_count === 0) {
            invitation.attending_plus_one_count = invitation.plus_one_count;
          }
          exportInvitation(invitation);
          var pocMap = [];
          for (var i = 0; i <= invitation.plus_one_count; i++) {
            pocMap[i] = i;
          }
          $scope.pocMap = pocMap;
        });

      $scope.accept = function() {
        console.log($scope.invitation);
        $scope.invitation.
          accept().
          then(exportInvitation);
      };

      $scope.reject = function() {
        $scope.invitation.
          reject().
          then(exportInvitation);
      };
    }]);
}());
