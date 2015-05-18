class PrepareDatabase < ActiveRecord::Migration
  def change
    enable_extension :hstore unless Rails.env.production?
  end
end
