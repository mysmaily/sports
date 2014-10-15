class Product < ActiveRecord::Base

  belongs_to :category
  has_many :photos
  has_attached_file :thum, :styles => { :small => "202x172#" },
                  :url  => "/assets/products/thumn/:id/:style/:basename.:extension",
                  :path => ":rails_root/public/assets/products/thumn/:id/:style/:basename.:extension"

  validates_attachment_presence :thum
  validates_attachment_size :thum, :less_than => 5.megabytes
  validates_attachment_content_type :thum, :content_type => ['image/jpeg', 'image/png']

  scope :home, where(:home => true)

  extend FriendlyId
  friendly_id :name, use: :slugged

  def should_generate_new_friendly_id?
    new_record?
  end
  
end
