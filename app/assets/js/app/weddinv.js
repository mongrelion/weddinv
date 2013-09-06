angular.module('weddinvApp', []).
  controller('ConfirmInvitationCtrl', ['$scope', function($scope) {
    $scope.invitation = {
      status : 'pending',
      accept : function() {
        this.status = 'accepted';
      },
      reject : function() {
        this.status = 'rejected';
      }
    };

    $scope.rsvp = function(opt) {
      if ('yes' === opt) {
        $scope.invitation.accept();
      } else if ('no' === opt) {
        $scope.invitation.reject();
      }
    };
  }]);
