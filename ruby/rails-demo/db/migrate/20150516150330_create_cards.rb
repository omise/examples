class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.hstore     :card_data
      t.belongs_to :charge, index: true
      t.belongs_to :customer, index: true
      t.timestamps null: false
    end
  end
end
