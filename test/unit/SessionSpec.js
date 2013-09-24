(function() {
  'use strict';

  describe('Session', function() {
    var httpBackend, Session;
    beforeEach(module('weddinvApp'));
    beforeEach(inject(function($injector) {
      Session     = $injector.get('Session');
      httpBackend = $injector.get('$httpBackend');
      httpBackend.when('GET', '/api/user').respond(200);
      httpBackend.when('POST', '/api/user').respond(200);
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should set loggedIn to false by default', function() {
      expect(Session.loggedIn).toBe(false);
    });

    describe('.isLoggedIn', function() {
      it('should perform a POST to /api/user', function() {
        httpBackend.expectGET('/api/user').respond(200);
        Session.isLoggedIn(function() {}, function() {});
        httpBackend.flush();
      });

      describe('given an active session the backend', function() {
        it('should call the given callback', function() {
          var test = {
            yes : function() {},
            no  : function() {}
          };
          spyOn(test, 'yes');
          spyOn(test, 'no');
          httpBackend.expectGET('/api/user').respond(200);
          Session.isLoggedIn(test.yes, test.no);
          httpBackend.flush();
          expect(test.yes).toHaveBeenCalled();
          expect(test.no).not.toHaveBeenCalled();
        });
      });

      describe('given no active session in backend', function() {
        it('should call the given callback', function() {
          var test = {
            yes : function() {},
            no  : function() {}
          };
          spyOn(test, 'yes');
          spyOn(test, 'no');
          httpBackend.expectGET('/api/user').respond(401);
          Session.isLoggedIn(test.yes, test.no);
          httpBackend.flush();
          expect(test.yes).not.toHaveBeenCalled();
          expect(test.no).toHaveBeenCalled();
        });
      });
    }); /* end .isLoggedIn */

    describe('.login', function() {
      // Username param validation.
      describe('given no username', function() {
        it('should raise an exception', function() {
          expect(function() {
            Session.login();
          }).toThrow('invalid username');
        });
      });

      describe('given the username is not an string', function() {
        it('should raise an exception', function() {
          [123, false, true, {}, function() {}].forEach(function(v) {
            expect(function() {
              Session.login(v);
            }).toThrow('invalid username');
          });
        });
      });

      describe('given the username is a blank string', function() {
        it('should raise an exception', function() {
          expect(function() {
            Session.login('');
          }).toThrow('invalid username');
        });
      });

      // Password param validation.
      describe('given no password', function() {
        it('should raise an exception', function() {
          expect(function() {
            Session.login('user');
          }).toThrow('invalid password');
        });
      });

      describe('given the password is not an string', function() {
        it('should raise an exception', function() {
          [123, false, true, {}, function() {}].forEach(function(v) {
            expect(function() {
              Session.login('user', v);
            }).toThrow('invalid password');
          });
        });
      });

      describe('given the password is a blank string', function() {
        it('should raise an exception', function() {
          expect(function() {
            Session.login('user', '');
          }).toThrow('invalid password');
        });
      });

      describe('given the backend says the login succeeded', function() {
        it('should set loggedIn property to true', function() {
          httpBackend.expectPOST('/api/login').respond(200);
          Session.loggedIn = false;
          Session.login('john', 'secret');
          httpBackend.flush();
          expect(Session.loggedIn).toBe(true);
        });

        describe('given a callback for when the login succeeded', function() {
          it('should call it', function() {
            var test = {
              success : function() {},
              fail    : function() {}
            };
            spyOn(test, 'success');
            spyOn(test, 'fail');
            httpBackend.expectPOST('/api/login').respond(200);
            Session.login('john', 'secret', test.success, test.fail);
            httpBackend.flush();
            expect(test.success).toHaveBeenCalled();
            expect(test.fail).not.toHaveBeenCalled();
          });
        });
      });

      describe('given the backend says the login failed', function() {
        it('should set loggedIn property to false', function() {
          httpBackend.expectPOST('/api/login').respond(401);
          Session.loggedIn = true;
          Session.login('john', 'secret');
          httpBackend.flush();
          expect(Session.loggedIn).toBe(false);
        });

        describe('given a callback for when the login failed', function() {
          it('should call it', function() {
            var test = {
              success : function() {},
              fail    : function() {}
            };
            spyOn(test, 'success');
            spyOn(test, 'fail');
            httpBackend.expectPOST('/api/login').respond(401);
            Session.login('john', 'secret', test.success, test.fail);
            httpBackend.flush();
            expect(test.fail).toHaveBeenCalled();
            expect(test.success).not.toHaveBeenCalled();
          });
        });
      });
    }); /* .login */

    describe('.logout', function() {
      describe('given no active session', function() {
        it('should not perform any request to the server', function() {
          var test = {
            success : function() {},
            fail    : function() {}
          };
          spyOn(test, 'success');
          spyOn(test, 'fail');
          Session.loggedIn = false;
          Session.logout(test.success, test.fail);
          expect(test.success).not.toHaveBeenCalled();
          expect(test.fail).not.toHaveBeenCalled();
        });
      });

      describe('given an active session', function() {
        beforeEach(function() {
          Session.loggedIn = true;
        });

        it('should post to /api/logout', function() {
          httpBackend.expectPOST('/api/logout').respond(200);
          Session.logout();
          httpBackend.flush();
        });

        describe('given the server says the logout succeeded', function() {
          it('should set loggedIn property to false', function() {
            httpBackend.expectPOST('/api/logout').respond(200);
            Session.logout();
            httpBackend.flush();
            expect(Session.loggedIn).toBe(false);
          });

          describe('given a callback for when the logout succeeded', function() {
            it('should call it', function() {
              httpBackend.expectPOST('/api/logout').respond(200);
              var test = {
                success : function() {}
              };
              spyOn(test, 'success');
              Session.logout(test.success);
              httpBackend.flush();
              expect(test.success).toHaveBeenCalled();
            });
          });

          describe('given a callback for when the logout failed', function() {
            it('should call it', function() {
              httpBackend.expectPOST('/api/logout').respond(500);
              var test = {
                fail : function() {}
              };
              spyOn(test, 'fail');
              Session.logout(undefined, test.fail);
              httpBackend.flush();
              expect(test.fail).toHaveBeenCalled();
            });
          });
        });
      });
    }); /* end .logout */
  });
}());
