class AddAttachmentThumnToArticles < ActiveRecord::Migration
  def self.up
    change_table :articles do |t|
      t.attachment :thumn
    end
  end

  def self.down
    remove_attachment :articles, :thumn
  end
end
