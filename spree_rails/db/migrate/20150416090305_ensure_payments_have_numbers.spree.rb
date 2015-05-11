# This migration comes from spree (originally 20150309161154)
class EnsurePaymentsHaveNumbers < ActiveRecord::Migration
  def change
    Spree::Payment.where(number: nil).find_each do |payment|
      payment.generate_number
      payment.save
    end
  end
end
