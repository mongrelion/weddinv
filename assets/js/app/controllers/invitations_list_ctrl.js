(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('InvitationsListCtrl', ['$scope', 'Invitation', function($scope, Invitation) {
      var loadInvitations = function() {
        Invitation.
          all('invitations').
          getList().
          then(function(invitations) {
            $scope.invitations = invitations;
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

      $scope.resendEmail = function($index) {
        var invitation = $scope.invitations[$index];
        window.invitation = invitation;
        if (confirm('Are you sure?')) {
          invitation.resendEmail();
        }
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
