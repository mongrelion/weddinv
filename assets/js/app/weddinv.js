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
        }).
        when('/invitations/new', {
          controller  : 'NewInvitationCtrl',
          templateUrl : '/views/invitations/new.html'
        }).
        when('/invitations/:id/edit', {
          controller  : 'EditInvitationCtrl',
          templateUrl : '/views/invitations/edit.html'
        }).
        when('/login', {
          controller  : 'SessionsCtrl',
          templateUrl : '/views/sessions/login.html'
        });

      $location.html5Mode(true);

      RestangularProvider.setBaseUrl('/api');
    }]);
}());
