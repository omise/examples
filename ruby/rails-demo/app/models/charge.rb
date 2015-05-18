class Charge < ActiveRecord::Base
  belongs_to :token
  belongs_to :customer

  validates :amount,   presence: true
  validates :currency, presence: true

  # If a customer is present use it to charge otherwise use a one-time-token
  # Omise Tokens can only be used once to charge, but it be saved as a customer
  def charge!
    if customer && customer.cards.any?
      transaction do
        remote_response = Omise::Charge.create({
          amount: amount, currency: currency, customer: customer.remote_id
        })
        store_charge(remote_response)
      end
    elsif token && token.card.present?
      transaction do
        remote_response = Omise::Charge.create({
          amount: amount, currency: currency, card: token.remote_id
        })
        store_charge(remote_response)
      end
    else
      raise "No Token, Customer or Card are present"
    end
  end

  private

  def store_charge(remote_response)
    remote_attr = remote_response.attributes.symbolize_keys
    remote_attr.delete("card")
    remote_attr.delete("refunds")
    self.response = remote_attr
    self.authorized = remote_attr[:authorized]
    self.captured = remote_attr[:captured]
    save
  end

end
