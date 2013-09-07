(function() {
  'use strict';

  angular.module('weddinvApp').
    controller('EditInvitationCtrl', ['$scope', '$routeParams', 'Invitation', function($scope, $params, Invitation) {
      $scope.invitation = Invitation.find($params.id);

      $scope.save = function() {};
    }]);
}());
