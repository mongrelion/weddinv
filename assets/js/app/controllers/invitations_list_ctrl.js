(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('InvitationsListCtrl', ['$scope', 'Invitation', function($scope, Invitation) {
      $scope.invitations = Invitation.getList();

      $scope.filters = [
        { label : 'All',      value : ''         },
        { label : 'Pending',  value : 'pending'  },
        { label : 'Accepted', value : 'accepted' },
        { label : 'Rejected', value : 'rejected' }
      ];

      $scope.search = { status : '', name : '' };

      $scope.resendEmail = function(invitationId) {
        alert('Resending email');
      };

      $scope.destroy = function(invitationId) {
        alert('Destroying invitation');
      };
    }]);
}());
