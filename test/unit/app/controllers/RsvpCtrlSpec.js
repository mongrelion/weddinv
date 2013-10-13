(function() {
  'use strict';

  describe('RsvpCtrl', function() {
    var $httpBackend, $translate, $controller, $scope, Invitation;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      $scope           = $injector.get('$rootScope').$new();
      Invitation       = $injector.get('Invitation');
      $httpBackend     = $injector.get('$httpBackend');
      $translate       = $injector.get('$translate');
      $controller      = $injector.get('$controller');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should call one invitation passing along the id from params', function() {
      $httpBackend.expectGET('/api/invitations/123').respond(200);
      spyOn(Invitation, 'one').andCallThrough();
      $controller('RsvpCtrl', {
        '$scope'       : $scope,
        '$routeParams' : { id : 123 },
        'Invitation'   : Invitation
      });
      expect(Invitation.one).toHaveBeenCalledWith('invitations', 123);
    });

    describe('given the server returns the requested invitation', function() {
      it('should assign it to the scope', function() {
        $httpBackend.expectGET('/api/invitations/123').respond({ id : 123 });
        $controller('RsvpCtrl', {
          '$scope'       : $scope,
          '$routeParams' : { id : 123 },
          'Invitation'   : Invitation
        });
        $httpBackend.flush();
        expect($scope.invitation).toBeDefined();
        expect($scope.invitation.id).toBe(123);
      });

      it('should tell $translate service what language to use from the invitation lang', function() {
        spyOn($translate, 'uses');
        $httpBackend.expectGET('/api/invitations/123').respond({ id : 123, lang : 'es' });
        $controller('RsvpCtrl', {
          '$scope'       : $scope,
          '$routeParams' : { id : 123 },
          'Invitation'   : Invitation
        });
        $httpBackend.flush();
        expect($translate.uses).toHaveBeenCalledWith('es');

        $httpBackend.expectGET('/api/invitations/123').respond({ id : 123, lang : 'ru' });
        $controller('RsvpCtrl', {
          '$scope'       : $scope,
          '$routeParams' : { id : 123 },
          'Invitation'   : Invitation
        });
        $httpBackend.flush();
        expect($translate.uses).toHaveBeenCalledWith('ru');
      });

      describe('given the requested invitation is pending', function() {
        describe('given the requested attending plus one count is zero', function() {
          it('should assign plus_one_count to attending_plus_one_count', function() {
            var invitation = {
              id                       : 123,
              status                   : 'pending',
              attending_plus_one_count : 0,
              plus_one_count           : 3
            };
            $httpBackend.expectGET('/api/invitations/123').respond(invitation);
            $controller('RsvpCtrl', {
              '$scope'       : $scope,
              '$routeParams' : { id : 123 },
              'Invitation'   : Invitation
            });
            $httpBackend.flush();
            expect($scope.invitation.attending_plus_one_count).toBe(3);
          });
        });
      });
    });

    describe('.accept', function() {
      it('should call the accept method on the invitation', function() {
        $httpBackend.expectGET('/api/invitations/123').respond({ id : 123 });
        $controller('RsvpCtrl', {
          '$scope'       : $scope,
          '$routeParams' : { id : 123 },
          'Invitation'   : Invitation
        });
        $httpBackend.flush();
        spyOn($scope.invitation, 'accept').andReturn({
          then : function(cb) {
            cb($scope.invitation);
          }
        });
        $scope.accept();
        expect($scope.invitation.accept).toHaveBeenCalled();
      });

      it('should assign the fetched information for the invitation to the scope', function() {
        $httpBackend.expectGET('/api/invitations/123').respond({ id : 123 });
        $controller('RsvpCtrl', {
          '$scope'       : $scope,
          '$routeParams' : { id : 123 },
          'Invitation'   : Invitation
        });
        $httpBackend.flush();
        $httpBackend.expectPOST('/api/invitations/123/accept').respond({
          id     : 123,
          status : 'accepted'
        });
        $scope.accept();
        $httpBackend.flush();
        expect($scope.invitation.status).toBe('accepted');
      });
    }); /* end .accept */

    describe('.reject', function() {
      it('should call the reject method on the invitation', function() {
        $httpBackend.expectGET('/api/invitations/123').respond({ id : 123 });
        $controller('RsvpCtrl', {
          '$scope'       : $scope,
          '$routeParams' : { id : 123 },
          'Invitation'   : Invitation
        });
        $httpBackend.flush();
        spyOn($scope.invitation, 'reject').andReturn({
          then : function(cb) {
            cb($scope.invitation);
          }
        });
        $scope.reject();
        expect($scope.invitation.reject).toHaveBeenCalled();
      });

      it('should assign the fetched information for the invitation to the scope', function() {
        $httpBackend.expectGET('/api/invitations/123').respond({ id : 123 });
        $controller('RsvpCtrl', {
          '$scope'       : $scope,
          '$routeParams' : { id : 123 },
          'Invitation'   : Invitation
        });
        $httpBackend.flush();
        $httpBackend.expectPOST('/api/invitations/123/reject').respond({
          id     : 123,
          status : 'rejected'
        });
        $scope.reject();
        $httpBackend.flush();
        expect($scope.invitation.status).toBe('rejected');
      });
    }); /* end .accept */
  });
}());
