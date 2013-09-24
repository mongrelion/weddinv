(function() {
  'use strict';

  angular.module('weddinvApp').
    factory('Session', ['Restangular', function(Restangular) {
      Restangular.all('login');

      var Session = {
        loggedIn : false
      };

      Session.isLoggedIn = function(yes, no) {
        Restangular.
          one('user').
          get().
          then(yes, no);
      };

      Session.login = function(username, password, success, error) {
        if (!username || 'string' !== typeof(username)) {
          throw new Error('invalid username');
        }

        if (!password || 'string' !== typeof(password)) {
          throw new Error('invalid password');
        }

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

      Session.logout = function(success, fail) {
        if (Session.loggedIn) {
          return Restangular.
            all('logout').
            post().
            then(function() {
              Session.loggedIn = false;
              if (success) success();
            }, fail);
        }
      };

      return Session;
    }]);
}());
