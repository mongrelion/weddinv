class InvitationMailer
  # - Class Methods - #
  class << self
    def deliver_invitation invitation
      unless invitation.is_a? Invitation
        raise ArgumentError, "Invitation expected but got #{invitation.class}"
      end

      @invitation_link = invitation.invitation_link
      Pony.mail(
        to:        invitation.email,
        subject:   "Assistance to the wedding",
        body:      plain_template,
        html_body: rich_template
      )
    end

    def rich_template
      ERB.new(File.read File.join('views', 'invitation_mailer', 'deliver_invitation.html.erb')).result binding
    end

    def plain_template
      ERB.new(File.read File.join('views', 'invitation_mailer', 'deliver_invitation.txt.erb')).result binding
    end
  end
end
