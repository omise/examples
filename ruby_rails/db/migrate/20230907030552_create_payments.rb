class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.string :charge_id
      t.string :payment_id
      t.string :payment_type
      t.timestamps
    end
  end
end
