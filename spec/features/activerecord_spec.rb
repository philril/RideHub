require_relative '../spec_helper'

describe User do
  it {should have_many(:rides)}

  it "takes a first name, last name" do
    user = User.create(first_name: "Joe", last_name: "Smith")
    expect(user.first_name).to eq("Joe")
    expect(user.last_name).to eq("Smith")
  end

end

describe Ride do
  it {should have_many(:users)}
end


describe Group do
  it {should belong_to(:user)}
  it {should belong_to(:ride)}
end


# User.create(first_name: "Jar-Jar", last_name: "Binks", city: "Star Wars City", state: "CA", email: "Jar-Jar@Jar.com", password: "password")

# Ride.create(ride_name: "Sunday Meander", date: "Mon, 29 Dec 2014", time: "12:08:49 -0800", street_number: "123", street_name: "Fake St.", city: "Fake Town", state: "CA", zip_code: 94530, country: "USA", location_add_detail: "no more detail", description: "no more desc", rider_leader_id: 1, skill_level: "Beginner", expected_dist: 20, estimated_ride_time: "2 hours", latitude: 35, longitude: -122)

# Group.create(
#   rides_id: 1
#   users_id: 1
# )