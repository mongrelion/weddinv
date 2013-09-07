(function() {
  var deps = ['restangular', 'ngRoute'];
  angular.module('weddinvApp', deps).
    config(['$routeProvider', '$locationProvider', 'RestangularProvider', function($router, $location, RestangularProvider) {
      $router.
        when('/rsvp/:id', {
          controller  : 'RsvpCtrl',
          templateUrl : '/views/rsvp.html'
        }).
        when('/invitations', {
          controller  : 'InvitationsListCtrl',
          templateUrl : '/views/invitations/list.html'
        });

      $location.html5Mode(true);

      RestangularProvider.setBaseUrl('/api');
    }]);
}());
