(function() {
  'use strict';

  angular.module('weddinvApp').
    directive('statistics', ['Stats', function(Stats) {
      return {
        restrict    : 'E',
        templateUrl : '/views/directives/statistics.html',
        replace     : true,
        scope       : { invitations : '=for' },
        controller  : ['$scope', function($scope) {
          $scope.$watch('invitations', function(newValue, oldValue) {
            if (angular.isArray(newValue)) {
              $scope.stats = new Stats($scope.invitations);
              $scope.stats.generate();
            }
          });
        }]
      };
    }]);
}());
