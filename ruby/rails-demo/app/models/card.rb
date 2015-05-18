class Card < ActiveRecord::Base
  belongs_to :token
  belongs_to :customer
end
