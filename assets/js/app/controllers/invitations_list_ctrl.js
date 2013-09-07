(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('InvitationsListCtrl', ['$scope', 'Invitation', function($scope, Invitation) {
      var loadInvitations = function() {
        $scope.invitations = Invitation.getList();
      };

      loadInvitations();

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

      $scope.destroy = function($index) {
        if (confirm('Are you sure?')) {
          var invitation = $scope.invitations.$$v[$index];
          invitation.remove().then(function() {
            loadInvitations();
          });
        }
      };
    }]);
}());
