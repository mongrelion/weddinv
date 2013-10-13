(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('NewInvitationCtrl', ['$scope', '$location', 'Invitation', function($scope, $location, Invitation) {
      $scope.invitation = { lang : 'en' };

      $scope.save = function() {
        Invitation.
          all('invitations').
          post($scope.invitation).
          then(function() {
            $location.path('/invitations');
          });
      };
    }]);
}());
