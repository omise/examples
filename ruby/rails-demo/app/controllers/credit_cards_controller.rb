class CreditCardsController < ApplicationController

  def new
  end

  # Example Charge for 100.00 THB
  def checkout
    @charge = Charge.new(token: Token.new(token: params[:omise_token]), amount: 10000, currency: 'thb')
    @charge.charge
  end

end
