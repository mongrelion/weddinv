(function() {
  'use strict';

  describe('MainCtrl', function() {
    var $rootScope, $scope, $controller, $location, controller;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      $rootScope  = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      $location   = $injector.get('$location');
      $scope      = $rootScope.$new();
      var params = {
        '$rootScope' : $rootScope,
        '$scope'     : $scope,
        '$location'  : $location
      };
      spyOn($scope, '$on');
      spyOn($rootScope, '$on');
      spyOn($location, 'path');

      controller = $controller('MainCtrl', params);
    }));

    it('should set loggedIn to false', function() {
      expect($scope.loggedIn).toBe(false);
    });

    it('should listen to "session:login" event on the scope', function() {
      expect($scope.$on).toHaveBeenCalledWith('session:login', jasmine.any(Function));
    });

    it('should listen to "session:logout" event on the scope', function() {
      expect($scope.$on).toHaveBeenCalledWith('session:logout', jasmine.any(Function));
    });

    it('should listen to "$routeChangeStart" event on the root scope', function() {
      expect($rootScope.$on).toHaveBeenCalledWith('$routeChangeStart', jasmine.any(Function));
    });

    xdescribe('when the "$routeChangeStart" event is triggered on the root scope', function() {
      describe('given the route requires login', function() {
        describe('given loggedIn in scope is false', function() {
          it('should redirect to /login path', function() {
            var route = { loginRequired : true };
            $scope.loggedIn = false;
            $rootScope.$broadcast('$routeChangeStart', undefined, route, undefined);
            waits(10);
            expect($location.path).toHaveBeenCalledWith('/login');
          });
        });

        describe('given the loggedIn in scope is true', function() {
          it('should not redirect anywhere', function() {
            var route = { loginRequired : true };
            $scope.loggedIn = true;
            $rootScope.$broadcast('$routeChangeStart', undefined, route, undefined);
            waits(10);
            expect($location.path).not.toHaveBeenCalled();
          });
        });
      });

      describe('given the route does not require login', function() {
        it('should not redirect anywhere', function() {
          var route = { loginRequired : false };
          $rootScope.$broadcast('$routeChangeStart', undefined, route, undefined);
          waits(10);
          expect($location.path).not.toHaveBeenCalled();
        });
      });
    });

    xdescribe('when "session:login" event is triggered on the scope', function() {
      it('should set loggedIn to true', function() {
        $scope.loggedIn = false;
        $rootScope.$broadcast('session:login');
        waits(10);
        expect($scope.loggedIn).toBe(true);
      });
    });

    xdescribe('when "session:logout" event is triggered on the scope', function() {
      it('should set loggedIn to false', function() {
        $scope.loggedIn = true;
        $rootScope.$broadcast('session:logout');
        waits(10);
        expect($scope.loggedIn).toBe(false);
      });
    });
  });
}());
