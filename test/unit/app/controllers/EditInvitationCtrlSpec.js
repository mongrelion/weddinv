(function() {
  'use strict';

  describe('EditInvitationCtrl', function() {
    var $httpBackend, $controller, $rootScope, $scope, $location, Invitation;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $controller  = $injector.get('$controller');
      $rootScope   = $injector.get('$rootScope');
      Invitation   = $injector.get('Invitation');
      $location    = $injector.get('$location');
      $scope       = $rootScope.$new();
      var params   = {
        '$scope'       : $scope,
        '$routeParams' : { id : '123' },
        '$location'    : $location,
        'Invitation'   : Invitation
      };
      $httpBackend.
        when('GET', '/api/invitations/123').
        respond(200, { id : 123, name : 'John Doe' });
      var ctrl = $controller('EditInvitationCtrl', params);
      $httpBackend.flush();
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    it('should get the invitation from the server', function() {
      $controller('EditInvitationCtrl', {
        '$routeParams' : { id : 'fake-id-123' },
        '$scope'       : $rootScope.$new(),
        '$location'    : $location,
        'Invitation'   : Invitation
      });
      $httpBackend.expectGET('/api/invitations/fake-id-123').respond(200);
      $httpBackend.flush();
    });

    describe('given an id of an existing invitation', function() {
      it('should assign it to the scope', function() {
        var invitation = { id : '456', name : 'John Doe' },
            params     = {
          '$routeParams' : { id : '456' },
          '$scope'       : $rootScope.$new(),
          '$location'    : $location,
          'Invitation'   : Invitation
        };
        $httpBackend.expectGET('/api/invitations/456').respond(200, invitation);
        var controller = $controller('EditInvitationCtrl', params);
        $httpBackend.flush();
        expect(params.$scope.invitation).toBe(invitation);
      });
    });

    describe('given an id of a non existing invitation', function() {
      it('should redirect to /invitations', function() {
        var params = {
          '$routeParams' : { id : '456' },
          '$scope'       : $rootScope.$new(),
          '$location'    : $location,
          'Invitation'   : Invitation
        };
        spyOn($location, 'path');
        $httpBackend.expectGET('/api/invitations/456').respond(404);
        $controller('EditInvitationCtrl', params);
        $httpBackend.flush();
        expect($location.path).toHaveBeenCalledWith('/invitations');
      });
    });

    describe('.save', function() {
      it('should PUT new invitation information to server', function() {
        $httpBackend.
          expectPUT('/api/invitations/123', { id : 123, name : 'Walter White' }).
          respond(200);
        $scope.invitation.name = 'Walter White';
        $scope.save();
        $httpBackend.flush();
      });

      describe('given the server says it updated the invitation', function() {
        it('should redirect to /invitations', function() {
          $httpBackend.expectPUT('/api/invitations/123').respond(200);
          spyOn($location, 'path');
          $scope.save();
          $httpBackend.flush();
          expect($location.path).toHaveBeenCalledWith('/invitations');
        });
      });

      describe('given the server says it did not update the invitation', function() {
        it('should show up an alert', function() {
          $httpBackend.expectPUT('/api/invitations/123').respond(500);
          spyOn(window, 'alert');
          $scope.save();
          $httpBackend.flush();
          expect(window.alert).toHaveBeenCalledWith('Something went wrong');
        });
      });
    }); /* end .save */
  });
}());
