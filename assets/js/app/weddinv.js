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
          controller    : 'InvitationsListCtrl',
          templateUrl   : '/views/invitations/list.html',
          loginRequired : true
        }).
        when('/invitations/new', {
          controller    : 'NewInvitationCtrl',
          templateUrl   : '/views/invitations/new.html',
          loginRequired : true
        }).
        when('/invitations/:id/edit', {
          controller    : 'EditInvitationCtrl',
          templateUrl   : '/views/invitations/edit.html',
          loginRequired : true
        }).
        when('/login', {
          controller  : 'SessionsCtrl',
          templateUrl : '/views/sessions/login.html'
        }).
        otherwise({
          redirectTo : '/invitations'
        });

      $location.html5Mode(true);

      RestangularProvider.setBaseUrl('/api');
    }]);
}());
