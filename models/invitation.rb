class Invitation
  include Mongoid::Document

  # - Fields - #
  field :invitee_name
  field :invitee_email
  field :status, default: 'pending'

  # - Validations - #
  validates_presence_of :invitee_name, :invitee_email

  # - Instance Methods - #
  def accept!
    update_status! 'accepted'
  end

  def reject!
    update_status! 'rejected'
  end

  def update_status! status
    update_attributes!(status: status) if self.status.eql? 'pending'
  end
end
