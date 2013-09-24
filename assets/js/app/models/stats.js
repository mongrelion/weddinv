(function() {
  'use strict';

  angular.module('weddinvApp').
    factory('Stats', ['Invitation', function(Invitation) {
      var Stats = function(invitations) {
        if (!_.isArray(invitations)) {
          throw new Error(['array expected but got ', typeof(invitations)].join(''));
        }

        this.invitations              = invitations;
        this.totalInvitations         = invitations.length;
        this.totalAcceptedInvitations = 0;
        this.totalRejectedInvitations = 0;
        this.totalPendingInvitations  = 0;
        this.totalAssistants          = 0;
      };

      // TODO: Given that this method may take a long time to be processed,
      //       maybe it'd be better if we worked with promises here.
      Stats.prototype.generate = function() {
        _.forEach(this.invitations, function(invitation) {
          if (invitation.isAccepted()) {
            this.totalAcceptedInvitations++;
            this.totalAssistants++;
            if ('number' === typeof(invitation.attending_plus_one_count)) {
              this.totalAssistants += invitation.attending_plus_one_count;
            }
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
