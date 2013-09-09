class Invitation
  include Mongoid::Document

  # - Fields - #
  field :name
  field :email
  field :status, default: 'pending'
  field :plus_one, type: Boolean, default: false
  field :plus_one_name

  # - Validations - #
  validates_presence_of :name, :email

  # - Class Methods - #
  class << self
    def params_hash params
      hash = {}
      [:name, :email, :status, :plus_one, :plus_one_name].each do |k|
        hash[k] = params[k.to_s] if params.keys.include?(k.to_s)
      end
      hash
    end
  end

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
