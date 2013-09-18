require 'minitest/autorun'
require 'minitest/pride'
require './boot'

Mongoid.load! './config/mongoid.yml', 'test'

def valid_invitation
  Invitation.new valid_invitation_params
end

def valid_invitation_params
  @valid_invitation_params ||= {
    name:                     'John Doe',
    email:                    'john@doe.com',
    status:                   'pending',
    plus_one:                 true,
    plus_one_name:            'Jenny Smith',
    plus_one_count:           1,
    attending_plus_one_count: 1
  }
end
