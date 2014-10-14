class Product < ActiveRecord::Base

  has_many :photos
  has_attached_file :thum, :styles => { :small => "200x170#" },
                  :url  => "/assets/products/thumn/:id/:style/:basename.:extension",
                  :path => ":rails_root/public/assets/products/thumn/:id/:style/:basename.:extension"

  validates_attachment_presence :thum
  validates_attachment_size :thum, :less_than => 5.megabytes
  validates_attachment_content_type :thum, :content_type => ['image/jpeg', 'image/png']

  scope :home, where(:home => true)
end
