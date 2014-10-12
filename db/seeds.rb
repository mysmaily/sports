# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
100.times do 
  Fabricate(:article, title: Faker::Name.title, description: Faker::Lorem.paragraph,
            content: Faker::Lorem.paragraph(2), thumn: File.open("#{Rails.root}/app/assets/images/#{rand(1..6)}.jpg"))
end