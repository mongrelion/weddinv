(function() {
  var deps = ['restangular', 'ngRoute'];
  angular.module('weddinvApp', deps).
    config(['$routeProvider', '$locationProvider', function($router, $location) {
      $router.when('/rsvp/:id', {
        controller  : 'RsvpCtrl',
        templateUrl : '/views/rsvp.html'
      });

      $location.html5Mode(true);
    }]);
}());
