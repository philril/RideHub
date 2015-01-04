class CreateGroupsTable < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.belongs_to :ride
      t.belongs_to :user

      t.timestamp
    end
  end
end