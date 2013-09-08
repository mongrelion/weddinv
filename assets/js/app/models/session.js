(function() {
  'use strict';

  angular.module('weddinvApp').
    factory('Session', ['Restangular', function(Restangular) {
      Restangular.all('login');
      var Session = {
        loggedIn : false
      };

      Session.login = function(username, password) {
        return Restangular.
          all('login').
          post({ username : username, password : password });
      };

      Session.logout = function() {
        this.loggedIn = false;
        return true;
      };

      return Session;
    }]);
}());
