(function() {
  'use strict';

  describe('NewInvitationCtrl', function() {
    var $httpBackend, $scope, $location;

    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      var $controller = $injector.get('$controller'),
          $rootScope  = $injector.get('$rootScope'),
          Invitation  = $injector.get('Invitation');
      $scope       = $rootScope.$new();
      $httpBackend = $injector.get('$httpBackend');
      $location    = $injector.get('$location');
      var ctrl     = $controller('NewInvitationCtrl', {
        '$scope' : $scope,
        '$location' : $location,
        'Invitation' : Invitation
      });
      spyOn($location, 'path');
    }));

    it('should initialize a invitation object in the scope', function() {
      expect($scope.invitation).toEqual({});
    });

    describe('.save', function() {
      it('should POST the scoped invitation to /api/invitations', function() {
        var invitation = { name : 'John Doe' };
        $scope.invitation = invitation;
        $httpBackend.expectPOST('/api/invitations', invitation).respond(200);
        $scope.save();
        $httpBackend.flush();
      });

      describe('when getting success from the server', function() {
        it('should redirect to /invitations', function() {
          $httpBackend.expectPOST('/api/invitations').respond(200);
          $scope.save();
          $httpBackend.flush();
          expect($location.path).toHaveBeenCalledWith('/invitations');
        });
      });
    }); /* end .save */
  });
}());
