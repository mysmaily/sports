# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
4.times do 
  Fabricate(:article, title: Faker::Name.title, description: Faker::Lorem.paragraph,
            content: Faker::Lorem.paragraph(2), thumn: File.open("#{Rails.root}/app/assets/images/#{rand(1..6)}.jpg"))
end
50.times do
  product = Fabricate(:product, name: Faker::Name.name, description: Faker::Lorem.paragraph,
            thum: File.open("#{Rails.root}/app/assets/images/cake/#{rand(1..6)}.jpg"),
            price: rand(1000.10000), home: [true,false].sample, price_saleoff: Settings.sale_off)
  2.times do
    product.photos << Photo.create!(photo: File.open("#{Rails.root}/app/assets/images/cake/#{rand(7..10)}.jpg") )
  end
  product.save!
end