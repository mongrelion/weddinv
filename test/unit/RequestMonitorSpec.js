(function() {
  'use strict';

  describe('requestMonitor', function() {
    var $http, $httpBackend, $httpProvider, $location;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      $http         = $injector.get('$http');
      $httpBackend  = $injector.get('$httpBackend');
      $location     = $injector.get('$location');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('when the server returns a 403', function() {
      it('should redirect to login path', function() {
        spyOn($location, 'path');
        $httpBackend.expectGET('/forbidden').respond(403);
        $http.get('/forbidden');
        $httpBackend.flush();
        expect($location.path).toHaveBeenCalledWith('/login');
      });
    });

    describe('when server returns any other status code different than 403', function() {
      it('should call along the registered "success" promises', function() {
        var test = {
          success : function() {},
          fail    : function() {}
        };

        spyOn(test, 'success');
        spyOn(test, 'fail');
        $httpBackend.expectGET('/foo').respond(200);
        $http.get('/foo').then(test.success, test.fail);
        $httpBackend.flush();
        expect(test.success).toHaveBeenCalled();
        expect(test.fail).not.toHaveBeenCalled();
      });

      it('should call along the registered "fail" promises', function() {
        var test = {
          success : function() {},
          fail    : function() {}
        };

        spyOn(test, 'success');
        spyOn(test, 'fail');
        $httpBackend.expectGET('/foo').respond(500);
        $http.get('/foo').then(test.success, test.fail);
        $httpBackend.flush();
        expect(test.fail).toHaveBeenCalled();
        expect(test.success).not.toHaveBeenCalled();
      });
    });
  });
}());
