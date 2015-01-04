require 'faker'
require 'bcrypt'

# addesses =
# ["11965 SAN PABLO AVE
# EL CERRITO, CA",
# "635 SAN PABLO AVE
# ALBANY, CA",
# "40 SAN PABLO TOWNE CTR
# SAN PABLO, CA",
# "2300 BARRETT AVE
# RICHMOND, CA",
# "1561 FITZGERALD DR
# PINOLE, CA",
# "6035 TELEGRAPH ROAD
# OAKLAND, CA",
# "1541 SYCAMORE AVENUE
# HERCULES, CA",
# "3839 EMERY STREET #700
# EMERYVILLE, CA",
# "2255 TELEGRAPH AVENUE
# OAKLAND, CA",
# "3501 MT. DIABLO BLVD
# LAFAYETTE, CA",
# "1900 WEBSTER
# ALAMEDA, CA",
# "410 MORAGAD
# MORAGA, CA",
# "3535 35TH AVENUE
# OAKLAND, CA",
# "1130 ARNOLD DR.
# MARTINEZ, CA",
# "700 MILITARY WEST
# BENICIA, CA",
# "2101 LOMBARD STREET
# SAN FRANCISCO, CA",
# "691 EDDY STREET
# SAN FRANCISCO, CA",
# "6900 BANCROFT AVE
# OAKLAND, CA",
# "2400 N. MAIN ST.
# WALNUT CREEK, CA",
# "1881 GEARY BOULEVARD
# SAN FRANCISCO, CA",
# "1700 CONTRAOSTALVD
# PLEASANT HILL, CA",
# "500 CONTRAOSTALVD
# PLEASANT HILL, CA",
# "200 DUBOCE AVENUE
# SAN FRANCISCO, CA",
# "1250 NEWELL AVE
# WALNUT CREEK, CA",
# "555 SECOND STREET
# SAN RAFAEL, CA"]

coords = [[37.930856, -122.32275219999997], [37.894064, -122.29991569999999], [37.9549192, -122.3314014], [37.9382003, -122.34715269999998], [37.9919915, -122.3028779], [37.8470497, -122.26123189999998], [38.0102513, -122.27131280000003], [37.8286894, -122.2822357], [37.8122403, -122.26960180000003], [37.8921016, -122.11658239999997], [37.7785503, -122.27635670000001]]

x = 0
while x < coords.length do
  Ride.create(
    ride_name: Faker::Commerce.product_name + " Ride",
    date: Date.new(2014,12,28) + rand(10),
    time: Time.new.strftime("%I:%M%p"),
    street_number: Faker::Address.building_number,
    street_name: Faker::Address.street_name,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    zip_code: Faker::Address.zip,
    country: "USA",
    location_add_detail: Faker::Lorem.paragraph,
    description: Faker::Lorem.paragraph,
    rider_leader_id: rand(1..20),
    skill_level: "Beginner",
    expected_dist: rand(100),
    estimated_ride_time: "#{rand(6)} hours",
    latitude: coords[x][0],
    longitude: coords[x][1])
  x += 1
end



# rand(37..38),
#  rand(-124..-120))

100.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    city: Faker::Address.city,
    state: Faker::Address.state_abbr,
    email: Faker::Internet.email,
    password: Faker::Internet.password)
end


users = [1..10, 11..20, 21..30, 31..40, 41..50, 51..60, 61..70, 71..80, 81..90, 91..100]
rides = (1..10).to_a

i = 0
while i <= 10 do
  User.all.where(id: users[i]).each {|user| Ride.find(rides[i]).users << user}
  i += 1
end



# RANDOM ADDRESSES: GENERATE ARRAY OF CORRESPONDING LAT/LONG & STORE IN SEPARATE ARRAY. HAS TO MATCH UP
addesses =
["11965 SAN PABLO AVE
EL CERRITO, CA",
"635 SAN PABLO AVE
ALBANY, CA",
"40 SAN PABLO TOWNE CTR
SAN PABLO, CA",
"2300 BARRETT AVE
RICHMOND, CA",
"1561 FITZGERALD DR
PINOLE, CA",
"6035 TELEGRAPH ROAD
OAKLAND, CA",
"1541 SYCAMORE AVENUE
HERCULES, CA",
"3839 EMERY STREET #700
EMERYVILLE, CA",
"2255 TELEGRAPH AVENUE
OAKLAND, CA",
"3501 MT. DIABLO BLVD
LAFAYETTE, CA",
"1900 WEBSTER
ALAMEDA, CA",
"410 MORAGAD
MORAGA, CA",
"3535 35TH AVENUE
OAKLAND, CA",
"1130 ARNOLD DR.
MARTINEZ, CA",
"700 MILITARY WEST
BENICIA, CA",
"2101 LOMBARD STREET
SAN FRANCISCO, CA",
"691 EDDY STREET
SAN FRANCISCO, CA",
"6900 BANCROFT AVE
OAKLAND, CA",
"2400 N. MAIN ST.
WALNUT CREEK, CA",
"1881 GEARY BOULEVARD
SAN FRANCISCO, CA",
"1700 CONTRAOSTALVD
PLEASANT HILL, CA",
"500 CONTRAOSTALVD
PLEASANT HILL, CA",
"200 DUBOCE AVENUE
SAN FRANCISCO, CA",
"1250 NEWELL AVE
WALNUT CREEK, CA",
"555 SECOND STREET
SAN RAFAEL, CA"]

coords = [[37.930856, -122.32275219999997],
[37.894064, -122.29991569999999],
[37.9549192, -122.3314014],
[37.9382003, -122.34715269999998],
[37.9919915, -122.3028779],
[37.8470497, -122.26123189999998],
[38.0102513, -122.27131280000003],
[37.8286894, -122.2822357],
[37.8122403, -122.26960180000003],
[37.8921016, -122.11658239999997],
[37.7785503, -122.27635670000001]]

# Ride.create(ride_name: Faker::Commerce.product_name, date: Date.new(2014,12,28) + rand(10), time: Time.new.strftime("%I:%M%p"), street_number: Faker::Address.building_number, street_name: Faker::Address.street_name, city: Faker::Address.city, state: Faker::Address.state_abbr, zip_code: Faker::Address.zip, country: "USA", location_add_detail: Faker::Lorem.sentence, description: Faker::Lorem.sentence, rider_leader_id: rand(10), skill_level: "Beginner",expected_dist: rand(100), estimated_ride_time: "#{rand(6)} hours", latitude: Faker::Address.latitude, longitude: Faker::Address.longitude)
