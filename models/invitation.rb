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

  # - Class Methods - #
  class << self
    def params_hash params
      hash = {}
      authorized_fields.each do |k|
        hash[k] = params[k.to_s] if params.keys.include?(k.to_s)
      end
      hash
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
    update_status! 'rejected'
  end

  def update_status! status
    update_attributes!(status: status) if self.status.eql? 'pending'
  end
end
