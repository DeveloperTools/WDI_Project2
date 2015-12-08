require 'sinatra/base'

require "./controllers/application"
require "./controllers/account"
require "./models/account"

map("/") { run AccountController }
map("/draft") { run DraftController }
