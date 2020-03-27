class Customer < ActiveRecord::Base
  has_many :charges
  has_many :cards

  def from_token(token)
    response = Omise::Customer.create({
      email: self.email,
      description: self.description,
      card: token.remote_id
    })
    self.location = response.attributes["location"]
    self.remote_id = response.attributes["id"]
    self.default_card_id = response.attributes["default_card"]
    self.cards << token.card
    save
  end

end
