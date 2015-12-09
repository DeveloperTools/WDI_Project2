class LeagueController < ApplicationController
  get '/' do
    erb :league
  end

  get '/create' do
    erb :create_league
  end
end
