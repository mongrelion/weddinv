require 'spec_helper'

describe Invitation do
  describe 'by default' do
    it 'must have status "pending"' do
      Invitation.new.status.must_equal 'pending'
    end

    it 'must set plus_one to false' do
      Invitation.new.plus_one.must_equal false
    end

    it 'must set plus_one_count to 0' do
      Invitation.new.plus_one_count.must_equal 0
    end

    it 'must set attending_plus_one_count to 0' do
      Invitation.new.attending_plus_one_count.must_equal 0
    end
  end

  it 'must be invalid without a name' do
    invitation = Invitation.new
    invitation.valid?.must_equal false
    invitation.errors.full_messages.join.must_match(/Name can't be blank/)
  end

  it 'must be invalid without an email' do
    invitation = Invitation.new
    invitation.valid?.must_equal false
    invitation.errors.full_messages.join.must_match(/Email can't be blank/)
  end

  describe '#params_hash' do
    describe 'passing an empty hash as an argument' do
      it 'must return an empty hash' do
        result = Invitation.params_hash({})
        result.empty?.must_equal true
      end
    end

    describe 'giving authorized fields' do
      it 'must included them in the returned hash' do
        params = {
          name:                     'John Doe',
          email:                    'john@doe.com',
          status:                   'pending',
          plus_one:                 true,
          plus_one_name:            'Jenny Smith',
          plus_one_count:           1,
          attending_plus_one_count: 1
        }
        result = Invitation.params_hash params
        params.each_pair do |key, value|
          result.keys.include?(key).must_equal true
          result[key].must_equal value
        end
      end
    end

    describe 'given unknown fields' do
      it 'must not include them in the returned hash' do
        params = {
          foo: 'foo',
          bar: 'bar'
        }
        result = Invitation.params_hash params
        result.keys.include?(:foo).must_equal false
        result.keys.include?(:bar).must_equal false
      end
    end
  end

  describe '#accept!' do
    it 'must set invitation status to "accepted"' do
      invitation = valid_invitation
      invitation.status = ''
      invitation.accept!
      invitation.status.must_equal 'accepted'
    end

    describe 'passing a number of attending plus pone' do
      it 'must set the number of attending_plus_one_count on the invitation' do
        invitation = valid_invitation
        invitation.accept! 123
        invitation.attending_plus_one_count.must_equal 123
      end
    end
  end

  describe '#reject!' do
    it 'must set invitation status to "rejected"' do
      invitation = valid_invitation
      invitation.reject!
      invitation.status.must_equal 'rejected'
    end
  end
end
