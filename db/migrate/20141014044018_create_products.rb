class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.integer :price
      t.boolean :home
      t.integer :price_saleoff

      t.timestamps
    end
  end
end
