class Charge < ActiveRecord::Base
  belongs_to :token
  belongs_to :customer
  has_one :card

  validates :amount,   presence: true
  validates :currency, presence: true

  # If a customer is present use it to charge otherwise use a one-time-token
  # Omise Tokens can only be used once to charge, but it be saved as a customer
  def charge
    args = { amount: amount, currency: currency }
    if token.present?
      args[:card] = token.token
    elsif (customer && customer.cards.any?)
      args[:customer] = customer.remote_id
    else
      return false
    end
    charge!(args)
  end

  private

  def charge!(args)
    remote_response = Omise::Charge.create(args)
    store_charge(remote_response)
  end

  def store_charge(remote_response)
    remote_attr = remote_response.attributes.symbolize_keys
    self.card = Card.new(card_data: remote_attr[:card].symbolize_keys)
    self.response = remote_attr
    self.authorized = remote_attr[:authorized]
    self.captured = remote_attr[:captured]
    save
  end

end
