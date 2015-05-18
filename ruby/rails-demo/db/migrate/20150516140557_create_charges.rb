class CreateCharges < ActiveRecord::Migration
  def change
    create_table :charges do |t|
      t.string      :remote_id
      t.integer     :amount
      t.hstore      :response
      t.string      :currency,    default: "thb"
      t.boolean     :authorized,  default: false
      t.boolean     :captured,    default: false
      t.belongs_to  :customer,    index: true
      t.belongs_to  :token,       index: true
      t.timestamps  null: false
    end
  end
end
