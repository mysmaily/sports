class AddAttachmentThumToProducts < ActiveRecord::Migration
  def self.up
    change_table :products do |t|
      t.attachment :thum
    end
  end

  def self.down
    remove_attachment :products, :thum
  end
end
