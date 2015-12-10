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

post '/select' do
  puts params
  @team = session[:current_team]
  if @team.id
    @result = Draft.find(@team.id)
  else
    return nil
  end

  if @result.player1_id == nil
    @result.player1_id = params[:name]
    @result.player1_yearid = params[:year]
    @result.save
  end
end

get '/random' do
  @team = session[:current_team]
  @playersarray = Array.new
  totalrecords = Player.count
  10.times do |item|
    item = Player.offset(rand * totalrecords).first
      while !item.batting_records
      item = Player.offset(rand * totalrecords).first
      end
      batting = item.batting_records
      playerhash = item.attributes
      playerhash[:batting] = batting
    @playersarray.push(playerhash)
  end
  return @playersarray.to_json
end

get '/search/:searchterm' do
# return player searched for
  if params[:searchterm] == nil
    return
  end
  @playersarray = Array.new
  searchresults = Player.where("namefirst LIKE ? OR namelast LIKE ?", "%#{params[:searchterm]}%", "%#{params[:searchterm]}%").limit(20)
  searchresults.each do |player|
    playerhash = player.attributes
    playerhash[:batting] = player.batting_records
    @playersarray.push(playerhash)
  end
  return @playersarray.to_json
end


end
