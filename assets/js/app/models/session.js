(function() {
  'use strict';

  angular.module('weddinvApp').
    factory('Session', ['Restangular', function(Restangular) {
      Restangular.all('login');
      var Session = {
        loggedIn : false
      };

      Session.login = function(username, password, success, error) {
        return Restangular.
          all('login').
          post({ username : username, password : password }).
          then(function() {
            Session.loggedIn = true;
            if (success) success();
          }, function() {
            Session.loggedIn = false;
            if (error) error();
          });
      };

      Session.logout = function() {
        return Restangular.
          all('logout').
          post().
          then(function() {
            Session.loggedIn = false;
          });
      };

      return Session;
    }]);
}());
