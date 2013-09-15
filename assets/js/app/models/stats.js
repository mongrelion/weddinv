(function() {
  'use strict';

  angular.module('weddinvApp').
    factory('Stats', [function() {
      var Stats = function(invitations) {
        if (!angular.isArray(invitations)) {
          var msg = [
            '"invitations" param expected to be array but got ',
            typeof(invitations)
          ].join('');
          throw new Error(msg);
        }

        this.invitations              = invitations;
        this.totalInvitations         = invitations.length;
        this.totalAcceptedInvitations = 0;
        this.totalRejectedInvitations = 0;
        this.totalPendingInvitations  = 0;
        this.totalAssistants          = 0;
      };

      Stats.prototype.generate = function() {
        _.forEach(this.invitations, function(invitation) {
          if (invitation.isAccepted()) {
            this.totalAcceptedInvitations++;
            this.totalAssistants++;
            this.totalAssistants += invitation.attending_plus_one_count;
          } else if (invitation.isRejected()) {
            this.totalRejectedInvitations++;
          } else if (invitation.isPending()) {
            this.totalPendingInvitations++;
          }
        }, this);
      };
      return Stats;
    }]);
}());
