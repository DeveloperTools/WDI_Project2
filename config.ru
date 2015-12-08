require 'sinatra/base'

require "./controllers/application"
require "./controllers/account"
require "./controllers/draft"
require "./controllers/player"
require "./models/account"
require "./models/draft"
require "./models/player"

map("/") { run AccountController }
map("/draft") { run DraftController }
