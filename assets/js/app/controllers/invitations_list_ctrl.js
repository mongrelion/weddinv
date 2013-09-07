(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('InvitationsListCtrl', ['$scope', 'Invitation', function($scope, Invitation) {
      $scope.invitations = Invitation.all('invitations').getList();
    }]);
}());
