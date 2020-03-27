Rails.application.routes.draw do
  root 'credit_cards#new'
  get 'credit_cards/new'
  post 'credit_cards/checkout'
end
