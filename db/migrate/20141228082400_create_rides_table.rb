class CreateRidesTable < ActiveRecord::Migration
  def change
    create_table :rides do |t|
      t.string :ride_name
      t.string :date
      t.string :time
      t.string :street_number
      t.string :street_name
      t.string :city
      t.string :state
      t.integer :zip_code
      t.string :country
      t.text :location_add_detail
      t.text :description
      t.integer :rider_leader_id
      t.string :skill_level
      t.integer :expected_dist
      t.string :estimated_ride_time
      t.float :latitude
      t.float :longitude

      t.timestamp
    end
  end
end