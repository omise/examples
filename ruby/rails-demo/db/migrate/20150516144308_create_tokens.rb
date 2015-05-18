class CreateTokens < ActiveRecord::Migration
  def change
    create_table :tokens do |t|
      t.string     :remote_id
      t.boolean    :used,     default: false
      t.boolean    :livemode, default: false
      t.string     :location
      t.timestamps null: false
    end
  end
end
