class Article < ActiveRecord::Base
  has_attached_file :thumn, :styles => { :small => "120x95#", :lager => "550x300#" },
                  :url  => "/assets/products/:id/:style/:basename.:extension",
                  :path => ":rails_root/public/assets/products/:id/:style/:basename.:extension"

  validates_attachment_presence :thumn
  validates_attachment_size :thumn, :less_than => 5.megabytes
  validates_attachment_content_type :thumn, :content_type => ['image/jpeg', 'image/png']
end
