require 'sinatra/base'

require "./controllers/account"
require "./controllers/application"
require "./models/account"

map("/") { run AccountController}
