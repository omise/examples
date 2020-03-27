class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.string    :remote_id
      t.boolean   :livemode, default: false
      t.string    :location
      t.string    :default_card_id
      t.string    :email
      t.string    :description
      t.timestamps null: false
    end
  end
end
