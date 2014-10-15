class Photo < ActiveRecord::Base

  self.table_name = 'photos'
  belongs_to :product
  has_attached_file :photo, :styles => { :lager => "500x300#" },
                  :url  => "/assets/products/photos/:id/:style/:basename.:extension",
                  :path => ":rails_root/public/assets/products/photos/:id/:style/:basename.:extension"

  validates_attachment_presence :photo
  validates_attachment_size :photo, :less_than => 5.megabytes
  validates_attachment_content_type :photo, :content_type => ['image/jpeg', 'image/png']
end
