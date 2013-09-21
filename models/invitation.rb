class Invitation
  include Mongoid::Document

  # - Fields - #
  field :name,                     type: String
  field :email,                    type: String
  field :status,                   type: String,  default: 'pending', type: String
  field :plus_one,                 type: Boolean, default: false
  field :plus_one_count,           type: Integer, default: 0
  field :plus_one_name,            type: String
  field :attending_plus_one_count, type: Integer, default: 0

  # - Validations - #
  validates_presence_of :name, :email

  # - Callbacks - #
  after_create :send_invitation_email

  # - Class Methods - #
  class << self
    def params_hash params
      hash = {}
      authorized_fields.each do |k|
        hash[k] = params[k] if params.keys.include?(k)
      end
      hash
    end

    def base_url
      @base_url ||= ENV['BASE_URL'].present? ? ENV['BASE_URL'] : 'http://weddinv.dev'
    end

    protected

    def authorized_fields
      @authorized_fields ||= [
        :name,
        :email,
        :status,
        :plus_one,
        :plus_one_name,
        :plus_one_count,
        :attending_plus_one_count
      ]
    end
  end

  # - Instance Methods - #
  def accept! attending_plus_one_count = nil
    self.status = 'accepted'
    self.attending_plus_one_count = attending_plus_one_count if attending_plus_one_count
    self.save!
  end

  def reject!
    update_attributes! status: 'rejected'
  end

  def invitation_link
    "#{self.class.base_url}/rsvp/#{id}" if persisted?
  end

  protected

  def send_invitation_email
    Mailer.deliver_invitation self if persisted?
  end
end
