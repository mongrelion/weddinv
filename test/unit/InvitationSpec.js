(function() {
  'use strict';

  describe('Invitation', function() {
    var httpBackend, Invitation, invitation;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      httpBackend = $injector.get('$httpBackend');
      Invitation  = $injector.get('Invitation');
      invitation  = Invitation.one('invitations');
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe('resendEmail', function() {
      describe('given a new invitation', function() {
        it('should raise an exception', function() {
          expect(function() {
            var invitation = Invitation.one('invitations');
            invitation.resendEmail();
          }).toThrow('Invitation is not persisted');
        });
      });

      describe('given an existing invitation', function() {
        beforeEach(function() {
          invitation.id = 1;
        });

        it('should POST to /invitation/:id/resend_email', function() {
          httpBackend.expectPOST('/api/invitations/1/resend_email').respond(200);
          invitation.resendEmail();
          httpBackend.flush();
        });
      });
    }); /* end .resendEmail */

    describe('.rsvp', function() {
      describe('passing no arguments to the function', function() {
        it('should raise an exception', function() {
          invitation.id = 1; // Avoid "Invitation not persisted" error.
          expect(function() {
            invitation.rsvp();
          }).toThrow('Confirmation action is not valid');
        });
      });

      describe('passing a blank string as an action', function() {
        it('should raise an exception', function() {
          invitation.id = 1; // Avoid "Invitation not persisted" error.
          expect(function() {
            invitation.rsvp('');
          }).toThrow('Confirmation action is not valid');
        });
      });

      describe('given a new invitation', function() {
        it('should raise an exception', function() {
          expect(function() {
            var invitation = Invitation.one('invitations');
            invitation.rsvp('accept');
          }).toThrow('Invitation is not persisted');
        });
      });

      describe('given an existing invitation', function() {
        beforeEach(function() {
          invitation.id = 1;
        });

        describe('passing "accept" as an argument', function() {
          it("should POST to /invitation/:id/accept", function() {
            httpBackend.expectPOST('/api/invitations/1/accept').respond(200);
            invitation.rsvp('accept');
            httpBackend.flush();
          });
        });

        describe('passing "reject" as an argument', function() {
          it("should POST to /invitation/:id/reject", function() {
            httpBackend.expectPOST('/api/invitations/1/reject').respond(200);
            invitation.rsvp('reject');
            httpBackend.flush();
          });
        });
      });
    }); /* end .rsvp */

    describe('.accept', function() {
      describe('given a new invitation', function() {
        it('should raise an exception', function() {
          var invitation = Invitation.one('invitations');
          expect(function() {
            invitation.accept();
          }).toThrow('Invitation is not persisted');
        });
      });

      describe('given an existing invitation', function() {
        it('should call rsvp() with "accept"', function() {
          invitation.id = 1;
          spyOn(invitation, 'rsvp');
          invitation.accept();
          expect(invitation.rsvp).toHaveBeenCalledWith('accept');
        });
      });
    }); /* end .accept */

    describe('.reject', function() {
      describe('given a new invitation', function() {
        it('should raise an exception', function() {
          var invitation = Invitation.one('invitations');
          expect(function() {
            invitation.reject();
          }).toThrow('Invitation is not persisted');
        });
      });

      describe('given an existing invitation', function() {
        it('should call rsvp() with "reject"', function() {
          invitation.id = 1;
          spyOn(invitation, 'rsvp');
          invitation.reject();
          expect(invitation.rsvp).toHaveBeenCalledWith('reject');
        });
      });
    }); /* end .reject */

    describe('.isAccepted', function() {
      describe('when the invitation status is "accepted"', function() {
        it('should return true', function() {
          invitation.status = 'accepted';
          expect(invitation.isAccepted()).toBe(true);
        });
      });

      describe('when the invitation status is not "accepted"', function() {
        it('should return false', function() {
          invitation.status = 'pending';
          expect(invitation.isAccepted()).toBe(false);
        });
      });
    }); /* end .isAccepted */

    describe('.isRejected', function() {
      describe('when the invitation status is "rejected"', function() {
        it('should return true', function() {
          invitation.status = 'rejected';
          expect(invitation.isRejected()).toBe(true);
        });
      });

      describe('when the invitation status is not "rejected"', function() {
        it('should return false', function() {
          invitation.status = 'pending';
          expect(invitation.isRejected()).toBe(false);
        });
      });
    }); /* end .isRejected */

    describe('.isPending', function() {
      describe('when invitation status is "pending"', function() {
        it('should return true', function() {
          invitation.status = 'pending';
          expect(invitation.isPending()).toBe(true);
        });
      });

      describe('when invitation status is not "pending"', function() {
        it('should return false', function() {
          invitation.status = 'accepted';
          expect(invitation.isPending()).toBe(false);
        });
      });
    }); /* end .isPending */
  });
}());
