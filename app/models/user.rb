class User < ActiveRecord::Base

  has_many :groups
  has_many :rides, :through => :groups

  validates :first_name, :last_name, :email, :password, presence: true
  validates :email, uniqueness: true
  # validates :password, uniqueness: true
  validates :email, format: {:with => /[\w\d]+@\w+.\w+/, :message => "Should be a valid email"}

  include BCrypt

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def authenticate(password)
    # NOTE TO SELF: self.password RETURNS "PASSWORD_HASH" FROM THE DATABASE!!!!!" THIS IS PART OF THE MAGIC BUILT IN TO BCRYPT. DON'T EVER CALL "SELF.PASSWORD_HASH." CALL "SELF.PASSWORD" AND THIS WILL LOOK FOR THE PASSWORD HASH IN THE DATABASE!
    self.password == password
  end

end