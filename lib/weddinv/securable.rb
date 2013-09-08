module Weddinv
  module Securable
    DIGEST_LENGTH = 512
    HEX_LENGTH    = 64

    def self.included(base)
      attr_accessor :password, :password_confirmation
      base.send :field, :encrypted_password
      base.send :field, :password_salt
      base.send :before_save, :encrypt_password!
      base.send :include, InstanceMethods
      base.extend ClassMethods
    end

    # - Class Methods - #
    module ClassMethods
      def digest
        @_digest ||= Digest::SHA2.new DIGEST_LENGTH
      end

      def encrypt password
        digest.hexdigest password if password.is_a? String
      end

      def authenticate username, password
        unless username.blank? # So that we don't hit database looking for blank username.
          if user = find_by(username: username) and user.valid_password? password
            user
          end
        end
      end

      def salt
        SecureRandom.hex HEX_LENGTH
      end
    end

    # - Instance Methods - #
    module InstanceMethods
      def valid_password? password
        password = salted_password password
        self.encrypted_password.eql? self.class.encrypt(password)
      end

      private

      def salted_password password
        self.password_salt + password
      end

      def set_password_salt!
        self.password_salt = self.class.salt
      end

      def encrypt_password!
        if self.password.present?
          if self.password.eql? self.password_confirmation
            set_password_salt!
            password = self.class.encrypt salted_password(self.password)
            self.encrypted_password = password
          else
            self.errors.add :password, "doesn't match confirmation"
          end
        end
      end
    end
  end
end
