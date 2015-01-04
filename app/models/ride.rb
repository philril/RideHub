class Ride < ActiveRecord::Base

  has_many :groups
  has_many :users, :through => :groups

  validate :date_validate

  validates :ride_name, :presence => {:message => "Entry must include ride name."}
  validates :date, :presence => {:message => "Entry must include date."}
  validates :time, :presence => {:message => "Entry must include time."}
  validates :city, :presence => {:message => "Entry must include city."}
  validates :state, :presence => {:message => "Entry must include state."}
  validates :zip_code, :presence => {:message => "Entry must include zip code."}
  # validates :country, :presence => {:message => "Entry must include country."}
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates_format_of :zip_code, {:with => /\A[0-9]{5}(-[0-9]{4})?\z/, :message => "should be in the form 12345 or 12345-1234"}
  validates_format_of :state, {:with => /\A[A-Z]{2}\z/, :message => "Should be valid two-letter US State abbreviation."}

  def date_validate
    if !date.blank? && date.to_s < Date.today.strftime("%m/%d/%Y")
      errors.add(:date, "This time is in the past!")
    end
  end

end