(function() {
  'use strict';

  angular.module('weddinvApp').
    factory('Invitation', ['$resource', function($resource) {
      var Invitation = $resource('/api/invitations/:id');
      Invitation.prototype.accept = function() {
        this.status = 'accepted';
      };

      Invitation.prototype.reject = function() {
          this.status = 'rejected';
      };

      return Invitation;
    }]);
}());
