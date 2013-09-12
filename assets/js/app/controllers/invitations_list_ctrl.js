(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('InvitationsListCtrl', ['$scope', 'Invitation', function($scope, Invitation) {
      var loadInvitations = function() {
        Invitation.
          all('invitations').
          getList().
          then(function(invitations) {
            // TODO: Move this to a directive to clean up the controller.
            $scope.invitations = invitations;

            var totalInvitations         = invitations.length,
                totalAcceptedInvitations = 0,
                totalRejectedInvitations = 0,
                totalPendingInvitations  = 0,
                totalAssistants          = 0;
            _.forEach(invitations, function(invitation) {
              switch(invitation.status) {
                case 'accepted':
                  totalAcceptedInvitations++;
                  totalAssistants++;
                  totalAssistants += invitation.attending_plus_one_count;
                  break;
                case 'rejected':
                  totalRejectedInvitations++;
                  break;
                case 'pending':
                  totalPendingInvitations++;
                  break;
              }
            });
            $scope.totalInvitations         = totalInvitations;
            $scope.totalAcceptedInvitations = totalAcceptedInvitations;
            $scope.totalRejectedInvitations = totalRejectedInvitations;
            $scope.totalPendingInvitations  = totalPendingInvitations;
            $scope.totalAssistants          = totalAssistants;
          });
      };

      loadInvitations();

      $scope.search          = { status : '', name : '' };
      $scope.filters         = [
        { label : 'All',      value : ''         },
        { label : 'Pending',  value : 'pending'  },
        { label : 'Accepted', value : 'accepted' },
        { label : 'Rejected', value : 'rejected' }
      ];

      $scope.resendEmail = function(invitationId) {
        alert('Not yet implemented!');
      };

      $scope.destroy = function($index) {
        if (confirm('Are you sure?')) {
          var invitation = $scope.invitations[$index];
          invitation.remove().then(function() {
            loadInvitations();
          });
        }
      };
    }]);
}());
