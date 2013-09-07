(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('RsvpCtrl', ['$scope', '$routeParams', 'Invitation', function($scope, $params, Invitation) {
      var exportInvitation = function(invitation) {
        $scope.invitation = invitation;
      };

      $scope.invitation = Invitation.one($params.id).get().then(exportInvitation);

      $scope.accept = function() {
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
