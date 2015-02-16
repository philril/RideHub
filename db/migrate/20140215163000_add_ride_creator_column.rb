class AddRideCreatorColumn < ActiveRecord::Migration
  def change
    add_column :rides, :ride_creator_id, :integer
  end
end