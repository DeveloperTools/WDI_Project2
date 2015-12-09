class DraftController < ApplicationController

get '/' do
  @account = Account.find_by(account_name: session[:current_account])
  erb :draft
end

post '/' do
  @team = Draft.create(
    :team_owner => params[:account_name],
    :team_name => params[:team_name],
    :league_name => params[:league_name]
  )
  session[:current_team] = @team
  redirect 'draft/live'
end

get '/live' do
  @team = session[:current_team]
  erb :live
end

post '/#' do

end

get '/random' do
  @team = session[:current_team]
  @playersarray = Array.new
  5.times do |item|
    item = Player.all.sample
      while !item.batting_records
      item = Player.all.sample
      end
      batting = item.batting_records
      playerjson = item.attributes
      playerjson[:batting] = batting
    @playersarray.push(playerjson)
  end
  return @playersarray.to_json
end

get '/:search' do
# return player searched for

end


end
