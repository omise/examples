class Token < ActiveRecord::Base
  has_one :charge
  has_one :card

  def store_token(response_attributes)
    transaction do
      self.remote_id = response_attributes[:id]
      self.card = Card.new(card_data: response_attributes[:card])
      self.used = response_attributes[:used]
      self.livemode = response_attributes[:livemode]
      self.location = response_attributes[:location]
      save
    end
  end

end
