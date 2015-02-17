get '/' do
  if session[:user_id]
    @user = User.find(session[:user_id])

    #ALL RIDES:
    # @all_rides = Ride.all.reverse

    #FILTERED BY FUTURE DATE:
    @all_rides = Ride.where(["date > ?", Time.now]).order(:date)

    erb :map
  else
    erb :index
  end
end

get '/homeAjax' do
  @ride_location = []

  Ride.where(["date > ?", Time.now]).order(:date).each {|ride| @ride_location << [ride.ride_name, ride.latitude, ride.longitude, ride.id, Time.parse(ride.date).strftime("%a %B %d, %Y"), Time.parse(ride.time).strftime("%-I:%M%p"), ride.users.length]}

  content_type :json
  {ride_loc: @ride_location}.to_json
end

post '/join_ride' do

  unless Ride.find(params[:ride_id]).users.include?(User.find(session[:user_id]))

    Ride.find(params[:ride_id]).users << User.find(session[:user_id])
    @current_user = User.find(session[:user_id])
    content_type :json
    {first_name: @current_user.first_name, last_name: @current_user.last_name, id: @current_user.id}.to_json
  end
end

get '/new_ride' do
  @all_users = User.all
  @current_user_id = session[:user_id]

  erb :new_ride
end

post '/new_ride' do
  date = DateTime.strptime(params[:date], '%m/%d/%Y')
  time = Time.parse(params[:time])

  @ride = Ride.new(
     ride_name: params[:ride_name],
     date: date,
     time: time,
     street_number: params[:street_number],
     street_name: params[:route],
     city: params[:locality],
     state: params[:state],
     zip_code: params[:postal_code].to_i,
     country: params[:country],
     location_add_detail: params[:location_add_detail],
     description: params[:description],
     rider_leader_id: params[:rider_leader_id].to_i,
     ride_creator_id: session[:user_id],
     skill_level: params[:skill_level],
     expected_dist: params[:expected_dist].to_i,
     estimated_ride_time: params[:estimated_ride_time].to_i,
     latitude: params[:latitude].to_f,
     longitude: params[:longitude].to_f
    )
  @ride.save

  redirect '/'

  # if @ride.save
  #   redirect '/'
  # else
  #   @all_users = User.all
  #   erb :new_ride
  # end
end

get '/ride/:id' do
  @ride = Ride.find(params[:id])
  @riders = Ride.find(params[:id]).users
  @leader_name = User.find(@ride.rider_leader_id)
  @ride_lat = Ride.find(params[:id]).latitude
  @ride_long = Ride.find(params[:id]).longitude
  @ride_id = Ride.find(params[:id]).id
  erb :ride
end

delete '/ride/:id' do
  @ride = Ride.find(params[:id])
  @ride.destroy
  redirect '/'
end

#EDIT RIDE

get '/edit_ride/:id' do
  @ride = Ride.find(params[:id])
  @riders = Ride.find(params[:id]).users
  @leader_name = User.find(@ride.rider_leader_id)
  @ride_lat = Ride.find(params[:id]).latitude
  @ride_long = Ride.find(params[:id]).longitude
  @ride_id = Ride.find(params[:id]).id
  @all_users = User.all

  erb :edit_ride
end

post '/edit_ride/:id' do
  # @ride = Ride.find(params[:id])

  date = DateTime.strptime(params[:date], '%m/%d/%Y')
  time = Time.parse(params[:time])

  Ride.update(params[:id], {
     ride_name: params[:ride_name],
     date: date,
     time: time,
     street_number: params[:street_number],
     street_name: params[:route],
     city: params[:locality],
     state: params[:state],
     zip_code: params[:postal_code].to_i,
     country: params[:country],
     location_add_detail: params[:location_add_detail],
     description: params[:description],
     rider_leader_id: params[:rider_leader_id].to_i,
     ride_creator_id: session[:user_id],
     skill_level: params[:skill_level],
     expected_dist: params[:expected_dist].to_i,
     estimated_ride_time: params[:estimated_ride_time].to_i,
     latitude: params[:latitude].to_f,
     longitude: params[:longitude].to_f
    }).save!

  # if @ride.save
  #   redirect '/'
  # else
  #   @all_users = User.all
  #   erb :new_ride
  # end
end

#END EDIT RIDE

get '/user/:id' do
  @this_user = User.find(params[:id])

  @past_rides = @this_user.rides.where(["date < ?", Time.now])

  @future_rides = @this_user.rides.where(["date > ?", Time.now])

  erb :user
end

get '/about' do
  erb :about
end

#----------- SESSIONS -----------

get '/sessions/new' do
  # render sign-in page
  erb :sign_in
end

post '/sessions' do
  # sign-in
  @user = User.find_by(email: params[:email])

  if @user
    if @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect "/"
    else
      erb :sign_in
    end
  end

end

delete '/sessions/:id' do
  # sign-out -- invoked
  session.delete(:user_id)
  redirect '/'
end

#----------- USERS -----------

get '/users/new' do
  # render sign-up page
  erb :sign_up
end

post '/users' do
  @user = User.new
  @user.first_name = params[:first_name]
  @user.last_name = params[:last_name]
  @user.email = params[:email]
  @user.password = params[:password]
  @user.city = params[:city]
  @user.state = params[:state]
  @user.save!
  session[:user_id] = @user.id
  redirect '/'
end

