(function() {
  'use strict';

  angular.module('weddinvApp').
    factory('Invitation', ['Restangular', function(Restangular) {
      var Invitation = Restangular.withConfig(function(config) {
        config.addElementTransformer('invitations', false, function(invitation) {
          invitation.rsvp = function(action) {
            var validActions = ['accept', 'reject'];

            if (!action || !_.contains(validActions, action)) {
              throw new Error('Confirmation action is not valid');
            }

            if (!invitation.id) {
              throw new Error('Invitation is not persisted');
            }

            return invitation.post(action);
          };

          invitation.accept = function() {
            return invitation.rsvp('accept');
          };

          invitation.reject = function() {
            return invitation.rsvp('reject');
          };

          invitation.resendEmail = function() {
            if (!invitation.id) {
              throw new Error('Invitation is not persisted');
            }
            return invitation.post('resend_email');
          };

          invitation.isAccepted = function() {
            return 'accepted' === invitation.status;
          };

          invitation.isRejected = function() {
            return 'rejected' === invitation.status;
          };

          invitation.isPending = function() {
            return 'pending' === invitation.status;
          };

          return invitation;
        });
      });

      return Invitation;
    }]);
}());
