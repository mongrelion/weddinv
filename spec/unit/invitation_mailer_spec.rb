require 'spec_helper'

describe InvitationMailer do
  describe '#invitation_rich_template' do
    it 'must render a HTML document' do
      template = InvitationMailer.rich_template
      template.gsub(/(\s|\n)/, '').must_match(/<\w.+>.+<\/\w.+>/)
    end
  end

  describe '#invitation_plain_template' do
    it 'must render a plain text template' do
      template = InvitationMailer.plain_template
      template.must_match(/We would like to know/)
    end
  end

  describe '#deliver_invitation' do
    it 'must accept an invitation' do
      [nil, :foo, 'bar', 123, false, Object.new, Invitation].each do |param|
        -> { InvitationMailer.deliver_invitation param }.must_raise ArgumentError
      end
    end

    describe 'for the outgoing email' do
      before :all do
        @invitation = Invitation.create valid_invitation_params
        @mail       = InvitationMailer.deliver_invitation @invitation
      end

      it 'must send a text/plain body' do
        @mail.body.parts.map(&:content_type).join.must_match(/text\/plain/)
      end

      it 'must send a text/html body' do
        @mail.body.parts.map(&:content_type).join.must_match(/text\/html/)
      end

      it 'must set the proper email' do
        @mail.to.join.must_equal 'john@doe.com'
      end

      it 'must set the proper subject' do
        @mail.subject.must_equal 'Assistance to the wedding'
      end

      it 'must include the invitation link' do
        r = /#{@invitation.invitation_link}/
        @mail.body.parts.join.must_match r
      end
    end
  end
end
