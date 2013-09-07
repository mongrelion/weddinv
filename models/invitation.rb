class Invitation
  include Mongoid::Document

  # - Fields - #
  field :name
  field :email
  field :status, default: 'pending'

  # - Validations - #
  validates_presence_of :name, :email

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
