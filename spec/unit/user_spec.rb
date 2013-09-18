require 'spec_helper'

describe User do
  it 'must be invalid without a username' do
    u = User.new
    u.valid?.must_equal false
    u.errors.full_messages.join.must_match(/Username can't be blank/)
  end
end
