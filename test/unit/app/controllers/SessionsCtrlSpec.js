(function() {
  'use strict';

  describe('SessionsCtrl', function() {
    var $scope, $location, $httpBackend, Session;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      $scope          = $injector.get('$rootScope').$new();
      $location       = $injector.get('$location');
      $httpBackend    = $injector.get('$httpBackend');
      Session         = $injector.get('Session');
      var $controller = $injector.get('$controller');
      $controller('SessionsCtrl', {
        '$scope'    : $scope,
        '$location' : $location,
        'Session'   : Session
      });
      $scope.username = 'john';
      $scope.password = 'secret';
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('initializes loginFailed to false', function() {
      expect($scope.loginFailed).toBe(false);
    });

    describe('.login', function() {
      it('should call Session.login with username and password', function() {
        spyOn(Session, 'login');
        $scope.login();
        expect(Session.login).toHaveBeenCalledWith('john', 'secret', jasmine.any(Function), jasmine.any(Function));
      });

      describe('given the server responds with status ok', function() {
        beforeEach(function() {
          spyOn($scope, '$emit');
          spyOn($location, 'path');
          $httpBackend.expectPOST('/api/login').respond(200);
          $scope.loginFailed = true;
          $scope.login();
          $httpBackend.flush();
        });

        it('should emit "session:login" event on the scope', function() {
          expect($scope.$emit).toHaveBeenCalledWith('session:login');
        });

        it('should set loginFailed to false', function() {
          expect($scope.loginFailed).toBe(false);
        });

        it('should redirect to /invitations', function() {
          expect($location.path).toHaveBeenCalledWith('/invitations');
        });
      });

      describe('given the server responds with error', function() {
        it('should set loginFailed to true', function() {
          $scope.loginFailed = false;
          $httpBackend.expectPOST('/api/login').respond(401);
          $scope.login();
          $httpBackend.flush();
          expect($scope.loginFailed).toBe(true);
        });
      });
    }); /* end .login */

    describe('.logout', function() {
      beforeEach(function() {
        Session.loggedIn = true; // If no session is present calls won't get through.
        $httpBackend.when('POST', '/api/logout').respond(200);
      });

      it('should call Session.logout', function() {
        spyOn(Session, 'logout').andReturn(jasmine.createSpyObj('logout', ['then']));
        $scope.logout();
        expect(Session.logout).toHaveBeenCalled();
      });

      describe('given the server responds with status ok', function() {
        beforeEach(function() {
          spyOn($scope, '$emit');
          spyOn($location, 'path');
          $scope.logout();
          $httpBackend.flush();
        });

        it('should emit a "session:logout" event on the scope', function() {
          expect($scope.$emit).toHaveBeenCalledWith('session:logout');
        });

        it('should redirect to /login', function() {
          expect($location.path).toHaveBeenCalledWith('/login');
        });
      });
    }); /* end .logout */
  });
}());
