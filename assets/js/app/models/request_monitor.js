(function() {
  angular.module('weddinvApp').
    factory('requestMonitor', ['$q', '$location', function($q, $location) {
      return function(promise) {
        return promise.then(function(response) {
            return response;
          }, function(response) {
            if (403 == response.status) {
              $location.path('/login');
            }
            return $q.reject(response);
          });
      };
    }]).
    config(['$httpProvider', function($httpProvider) {
      $httpProvider.responseInterceptors.push('requestMonitor');
    }]);
}());
