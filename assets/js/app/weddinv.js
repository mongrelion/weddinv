(function() {
  var deps = ['restangular', 'ngRoute', 'pascalprecht.translate'];
  angular.module('weddinvApp', deps).
    config(['$routeProvider', '$locationProvider', 'RestangularProvider', '$translateProvider', function($router, $location, RestangularProvider, $translator) {
      $router.
        when('/rsvp/:id', {
          controller  : 'RsvpCtrl',
          templateUrl : '/views/invitations/rsvp.html'
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

      $translator.translations('en', {
        rsvpCopyParagraph1         : 'would like to known if you',
        rsvpCopyParagraph2Singular : 'are able to attend their wedding. Please RSVP by the 15th of November 2013. We hope you can make it!',
        rsvpCopyParagraph2Plural   : 'are able to attend their wedding. Please RSVP by the 15th of November 2013. We hope you can make it!',
        weddingDate                : 'Saturday, 4th of January - 2014 at 3pm COT'
      });

      $translator.translations('es', {
        rsvpCopyParagraph1         : 'desean saber si tú',
        rsvpCopyParagraph2Singular : 'puedes asistir a nuestro evento. Por favor, responder esta solicitud antes de Noviembre 15 de 2.013. Muchas gracias.',
        rsvpCopyParagraph2Plural   : 'pueden asistir a nuestro evento. Por favor, responder esta solicitud antes de Noviembre 15 de 2.013. Muchas gracias.',
        weddingDate                : 'Sábado, 4 de Enero de 2014 a las 03:00pm COT'
      });

      $translator.preferredLanguage('en');
      $translator.fallbackLanguage('en');
    }]);
}());
