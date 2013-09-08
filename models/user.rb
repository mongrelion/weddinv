class User
  include Mongoid::Document
  include Weddinv::Securable

  # - Virtual Attributes - #
  attr_accessor :password, :password_confirmation

  # - Fields - #
  field :username

  # - Validations - #
  validates_presence_of :username
end
