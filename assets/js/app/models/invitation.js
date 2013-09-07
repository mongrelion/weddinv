(function() {
  'use strict';

  angular.module('weddinvApp').
    factory('Invitation', ['Restangular', function(Restangular) {
      var Invitation = Restangular.withConfig(function(config) {
        config.addElementTransformer('invitations', false, function(invitation) {
          var validActions = ['accept', 'reject'],
              rsvp         = function(action) {
            if (_.contains(validActions, action)) {
              return invitation.post(action);
            } else {
              return invitation;
            }
          };

          invitation.accept = function() {
            return rsvp('accept');
          };

          invitation.reject = function() {
            return rsvp('reject');
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

      Invitation.find = function(id) {
        return Invitation.one('invitations', id).get();
      };

      return Invitation;
    }]);
}());
