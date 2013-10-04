(function() {
  'use strict';

  describe('InvitationsListCtrl', function() {
    var $controller, $scope, $httpBackend, Invitation, ctrl;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      $httpBackend    = $injector.get('$httpBackend');
      Invitation      = $injector.get('Invitation');
      $controller     = $injector.get('$controller');
      var $rootScope  = $injector.get('$rootScope'),
          invitations = [{ id : 1, name : 'John Doe' }];
      $scope          = $rootScope.$new();

      $httpBackend.
        when('GET', '/api/invitations').
        respond(200, invitations);

      ctrl = $controller('InvitationsListCtrl', {
        '$scope'     : $scope,
        'Invitation' : Invitation
      });

      $httpBackend.flush();
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingRequest();
      $httpBackend.verifyNoOutstandingExpectation();
    });

    describe('loading invitations', function() {
      describe('given the server returns a list of invitations', function() {
        xit('should assign them to the scope', function() {
          expect($scope.invitations).toEqual([{ id : 1, name : 'John Doe' }]);
        });
      });

      describe('given the server returns an error', function() {
        it('should alert an error message', function() {
          $httpBackend.expectGET('/api/invitations').respond(302);
          spyOn(window, 'alert');
          $controller('InvitationsListCtrl', {
            '$scope'     : $scope,
            'Invitation' : Invitation
          });
          $httpBackend.flush();
          expect(window.alert).toHaveBeenCalledWith('Something went wrong');
        });
      });
    });

    describe('.resendEmail', function() {
      describe('given the user confirms the request', function() {
        beforeEach(function() {
          spyOn(window, 'confirm').andReturn(true);
        });

        it('should call resendEmail() method on the invitation', function() {
          var invitation = $scope.invitations[0];
          spyOn(invitation, 'resendEmail');
          $scope.resendEmail(0);
          expect(invitation.resendEmail).toHaveBeenCalled();
        });
      });

      describe('given the user cancels the request', function() {
        beforeEach(function() {
          spyOn(window, 'confirm').andReturn(false);
        });

        it('should not call the resendEmail method on the invitation', function() {
          var invitation = $scope.invitations[0];
          spyOn(invitation, 'resendEmail');
          $scope.resendEmail(0);
          expect(invitation.resendEmail).not.toHaveBeenCalled();
        });
      });
    }); /* end .resendEmail */

    describe('.destroy', function() {
      describe('given the user confirms the request', function() {
        beforeEach(function() {
          $httpBackend.expectDELETE('/api/invitations/1').respond(200);
          spyOn(window, 'confirm').andReturn(true);
        });

        it('should call remove() method on the invitation', function() {
          var invitation = $scope.invitations[0];
          spyOn(invitation, 'remove').andCallThrough();
          $scope.destroy(0);
          expect(invitation.remove).toHaveBeenCalled();
        });

        it('should reload the invitations', function() {
          spyOn(ctrl, 'loadInvitations');
          $scope.destroy(0);
          $httpBackend.flush();
          expect(ctrl.loadInvitations).toHaveBeenCalled();
        });
      });

      describe('given the user cancels the request', function() {
        beforeEach(function() {
          spyOn(window, 'confirm').andReturn(false);
        });

        it('should not call the remove method on the invitation', function() {
          var invitation = $scope.invitations[0];
          spyOn(invitation, 'remove');
          $scope.destroy(0);
          expect(invitation.remove).not.toHaveBeenCalled();
        });
      });
    }); /* end .resendEmail */
  });
}());
