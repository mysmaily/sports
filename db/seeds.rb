puts "Create User"
  User.create(:email => 'admin@gmail.com', :password => 'handoichantinh', :password_confirmation => 'handoichantinh')
  User.create(:email => 'mod@gmail.com', :password => 'handoichantinh', :password_confirmation => 'handoichantinh')
  User.create(:email => 'user@gmail.com', :password => 'handoichantinh', :password_confirmation => 'handoichantinh')

puts "Create Product Category and Product"
  4.times do 
    Fabricate(:article, title: Faker::Name.title, description: Faker::Lorem.paragraph,
              content: Faker::Lorem.paragraph(2), thumn: File.open("#{Rails.root}/app/assets/images/#{rand(1..6)}.jpg"))
  end

  10.times do
    category = Fabricate(:category, name: Faker::Name.name)
      10.times do
        product = Product.new(name: Faker::Name.name, description: Faker::Lorem.paragraph,
                  thum: File.open("#{Rails.root}/app/assets/images/cake/#{rand(1..6)}.jpg"),
                  price: rand(1000.10000), home: [true,false].sample, price_saleoff: Settings.sale_off)
        2.times do
          product.photos << Photo.create!(photo: File.open("#{Rails.root}/app/assets/images/cake/#{rand(7..10)}.jpg") )
        end
        product.save!
        category.products << product
      end

  end