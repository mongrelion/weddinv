(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('RsvpCtrl', ['$scope', '$routeParams', 'Invitation', function($scope, $params, Invitation) {
      Invitation.get({ id : $params.id }, function(invitation) {
        $scope.invitation = invitation;
      });

      $scope.rsvp = function(opt) {
        if ('yes' === opt) {
          $scope.invitation.accept();
        } else if ('no' === opt) {
          $scope.invitation.reject();
        }
      };
    }]);
}());
