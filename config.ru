require 'sinatra/base'

require "./controllers/application"
require "./controllers/account"
require "./controllers/draft"
require "./controllers/player"
require "./controllers/league"
require "./models/account"
require "./models/draft"
require "./models/player"
require "./models/league"

map("/") { run AccountController }
map("/draft") { run DraftController }
map("/league") { run LeagueController }
