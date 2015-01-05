# Require config/environment.rb
require ::File.expand_path('../config/environment',  __FILE__)

set :app_file, __FILE__

use ActiveRecord::Connection Adapters::ConnectionManagement

run Sinatra::Application
