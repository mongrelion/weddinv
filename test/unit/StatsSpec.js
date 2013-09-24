(function() {
  'use strict';

  describe('Stats', function() {
    var Stats, Invitation, invitations;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      Stats       = $injector.get('Stats');
      Invitation  = $injector.get('Invitation');
      invitations = [];
      for (var i = 0; i < 3; i++) {
        invitations.push(Invitation.one('invitations'));
      };
    }));

    describe('constructor', function() {
      describe('passing a non-array argument', function() {
        it('should raise an exception', function() {
          [undefined, true, 123, 'lol'].forEach(function(arg) {
            var type   = typeof arg,
                errMsg = ['array expected but got', type].join(' ');
            expect(function() {
              new Stats(arg);
            }).toThrow(errMsg);
          });
        });
      });

      xdescribe('passing an array of random elements', function() {
        it('should raise an exception', function() {
          var elements = [123, 'foo', Object, function() {}, {}];
          expect(function() {
            new Stats(elements);
          }).toThrow('array members are not invitations');
        });
      });

      describe('passing an array of invitations', function() {
        it('should assign the array to its own invitation property', function() {
          var stats = new Stats(invitations);
          expect(stats.invitations).toBe(invitations);
        });
      });

      describe('defaults', function() {
        var stats;
        beforeEach(function() {
          stats = new Stats(invitations);
        });

        it('should set totalInvitations to the length of invitations', function() {
          expect(stats.totalInvitations).toEqual(invitations.length);
        });

        it('should set totalAcceptedInvitations to zero', function() {
          expect(stats.totalAcceptedInvitations).toBe(0);
        });

        it('should set totalRejectedInvitations to zero', function() {
          expect(stats.totalRejectedInvitations).toBe(0);
        });

        it('should set totalPendingInvitations to zero', function() {
          expect(stats.totalPendingInvitations).toBe(0);
        });

        it('should set totalAssistants to zero', function() {
          expect(stats.totalAssistants).toBe(0);
        });
      });
    }); /* end .constructor */

    describe('.generate', function() {
      var stats, invitations;
      beforeEach(function() {
        invitations = [];
        ['accepted', 'rejected', 'pending'].forEach(function(status) {
          var limit;
          switch(status) {
            case 'accepted':
              limit = 5;
              break;
            case 'rejected':
              limit = 7;
              break;
            case 'pending':
              limit = 3;
              break;
          }

          for (var i = 0; i < limit; i++) {
            var invitation = Invitation.one('invitations');
            invitation.status = status;
            invitations.push(invitation);
          };
        });
        stats = new Stats(invitations);
        stats.generate();
      });

      it('should resolve total accepted invitations', function() {
        expect(stats.totalAcceptedInvitations).toBe(5);
      });

      it('should resolve total rejected invitations', function() {
        expect(stats.totalRejectedInvitations).toBe(7);
      });

      it('should resolve total pending invitations', function() {
        expect(stats.totalPendingInvitations).toBe(3);
      });

      it('should resolve total assistants', function() {
        expect(stats.totalAssistants).toBe(5);
      });

      describe('given an invitation with attending plus one count defined', function() {
        it('should be included in the number of total assistants', function() {
          var invitation                      = Invitation.one('invitations');
          invitation.status                   = 'accepted';
          invitation.attending_plus_one_count = 7;
          var stats                           = new Stats([invitation]);
          stats.generate();
          expect(stats.totalAssistants).toBe(8);
        });
      });

      // TODO: validate case for attending_plus_one_count;
    }); /* end .generate */
  });
}());
