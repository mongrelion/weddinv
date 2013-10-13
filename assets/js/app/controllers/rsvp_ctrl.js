(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('RsvpCtrl', ['$scope', '$routeParams', '$translate', 'Invitation', function($scope, $params, $translate, Invitation) {
      Invitation.
        one('invitations', $params.id).
        get().
        then(function(invitation) {
          // TODO: Maybe move this into a directive.
          if (invitation.isPending() && invitation.attending_plus_one_count === 0) {
            invitation.attending_plus_one_count = invitation.plus_one_count;
          }

          $scope.invitation = invitation;
          $translate.uses(invitation.lang);

          var pocMap = [];
          for (var i = 0; i <= invitation.plus_one_count; i++) {
            pocMap[i] = i;
          }
          $scope.pocMap = pocMap;
        });

      $scope.accept = function() {
        $scope.invitation.
          accept().
          then(function(invitation) {
            $scope.invitation = invitation;
          });
      };

      $scope.reject = function() {
        $scope.invitation.
          reject().
          then(function(invitation) {
            $scope.invitation = invitation;
          });
      };
    }]);
}());
