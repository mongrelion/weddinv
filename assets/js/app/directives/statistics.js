(function() {
  'use strict';

  angular.module('weddinvApp').
    directive('statistics', [function() {
      return {
        restrict    : 'E',
        templateUrl : '/views/directives/statistics.html',
        replace     : true,
        scope       : { invitations : '=for' },
        controller  : ['$scope', function($scope) {
          $scope.$watch('invitations', function(newValue, oldValue) {
            if (angular.isArray(newValue)) {
              // TODO: Do things right and move all this crap to its own model.
              var totalInvitations         = $scope.invitations.length,
                  totalAcceptedInvitations = 0,
                  totalRejectedInvitations = 0,
                  totalPendingInvitations  = 0,
                  totalAssistants          = 0;
              _.forEach($scope.invitations, function(invitation) {
                if (invitation.isAccepted()) {
                  totalAcceptedInvitations++;
                  totalAssistants++;
                  totalAssistants += invitation.attending_plus_one_count;
                } else if (invitation.isRejected()) {
                  totalRejectedInvitations++;
                } else if (invitation.isPending()) {
                  totalPendingInvitations++;
                }
              });
              $scope.totalInvitations         = totalInvitations;
              $scope.totalAcceptedInvitations = totalAcceptedInvitations;
              $scope.totalRejectedInvitations = totalRejectedInvitations;
              $scope.totalPendingInvitations  = totalPendingInvitations;
              $scope.totalAssistants          = totalAssistants;
            }
          });
        }]
      };
    }]);
}());
