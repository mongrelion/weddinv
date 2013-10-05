(function() {
  'use strict';

  angular.module('weddinvApp').
    directive('statistics', ['Stats', function(Stats) {
      return {
        restrict    : 'E',
        replace     : true,
        scope       : { invitations : '=for' },
        controller  : ['$scope', function($scope) {
          $scope.$watch('invitations', function(newValue, oldValue) {
            if (angular.isArray(newValue)) {
              $scope.stats = new Stats($scope.invitations);
              $scope.stats.generate();
            }
          });
        }],
        template : [
          '<div class="well">',
          '<p>Total of people assisting the event: <b>{{stats.totalAssistants}}</b></p>',
          '<p>Total of invitations: <b>{{stats.totalInvitations}}</b></p>',
          '<p>Total of accepted invitations: <b>{{stats.totalAcceptedInvitations}}</b></p>',
          '<p>Total of rejected invitations: <b>{{stats.totalRejectedInvitations}}</b></p>',
          '<p>Total of pending invitations: <b>{{stats.totalPendingInvitations}}</b></p>',
          '</div>'
        ].join('')
      };
    }]);
}());
