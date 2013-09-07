(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('RsvpCtrl', ['$scope', '$routeParams', 'Restangular', function($scope, $params, Restangular) {
      var exportInvitation = function(invitation) {
        $scope.invitation = invitation;
      };

      Restangular.one('invitations', $params.id).get().then(exportInvitation);

      $scope.rsvp = function(action) {
        if (_.contains(['accept', 'reject'], action)) {
          $scope.invitation.post(action).then(exportInvitation);
        }
      };
    }]);
}());
