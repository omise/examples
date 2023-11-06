Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "charge#index"

  post 'create_charge', to: 'charge#chargeCard'
  post 'create_charge_omise', to: 'charge#chargeCardOmise'
  post 'create_charge_omise_another', to: 'charge#chargeCardOmiseAnother'
  post 'paypay_charge', to: 'charge#chargePayPay'
  post 'paypay_charge_another', to: 'charge#chargePayPayAnother'
  post 'google_charge', to: 'charge#chargeGoogle'
  get 'paypay_return/:payment_id', to: 'charge#returnPayPay'
end
