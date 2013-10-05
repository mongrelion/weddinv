(function() {
  'use strict';

  describe('statistics', function() {
    var $scope, element;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      $scope           = $injector.get('$rootScope').$new();
      var $compile     = $injector.get('$compile'),
      template         = "<statistics for='invitations'></statistics>";

      element = $compile(template)($scope);
      $scope.$digest();
    }));

    it('should replace its placeholder', function() {
      expect(element[0].localName).toBe('div');
    });

    describe('viewport', function() {
      var paragraphs;
      beforeEach(function() {
        $scope.invitations = [];
        for (var i = 0; i < 3; i++) {
          $scope.invitations.push(jasmine.createSpyObj('invitation', [
            'isAccepted',
            'isRejected',
            'isPending'
          ]));
        };
        $scope.invitations[0].isPending.andReturn(true);
        $scope.invitations[1].isRejected.andReturn(true);
        $scope.invitations[2].isAccepted.andReturn(true);
        $scope.$digest();
        paragraphs = element.find('p');
      });

      it('should show up total number of people assisting the event', function() {
        expect(paragraphs.eq(0).text()).toMatch(/Total of people assisting the event: 1/);
      });

      it('should show up total number of invitations', function() {
        expect(paragraphs.eq(1).text()).toMatch(/Total of invitations: 3/);
      });


      it('should show up total number of accepted invitations', function() {
        expect(paragraphs.eq(2).text()).toMatch(/Total of accepted invitations: 1/);
      });

      it('should show up total number of rejected invitations', function() {
        expect(paragraphs.eq(3).text()).toMatch(/Total of rejected invitations: 1/);
      });

      it('should show up total number of pending invitations', function() {
        expect(paragraphs.eq(4).text()).toMatch(/Total of pending invitations: 1/);
      });
    });
  });
}());
