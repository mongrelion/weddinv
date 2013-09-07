class Invitation
  include Mongoid::Document

  # - Fields - #
  field :invitee_name
  field :invitee_email
  field :status, default: 'pending'
end
