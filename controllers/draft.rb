class DraftController < ApplicationController


# get '/' do
#   @account = Account.find_by(account_name: session[:current_account])
#   erb :draft
# end
#
# post '/' do
#   @team = Draft.create(
#     :team_owner => params[:account_name],
#     :team_name => params[:team_name]
#     :league_name => params[:league_name]
#   )
#   session[:current_team] = @team
#   redirect 'draft/live'
# end

get '/' do
  session[:current_league] = params[:league_name]
  erb :draft
end

post '/' do
  Draft.create(
    :team_owner => session[:current_account],
    :team_name => params[:team_name],
    :league_name => session[:current_league]
  )
  session[:current_team] = params[:team_name]
  redirect '/draft/live'
end


get '/live' do
  league = Draft.find_by(team_name: session[:current_team])
  session[:league_name] = league.league_name
  erb :live
end

post '/select' do
  puts params
  @result = Draft.find_by(team_name: session[:current_team])
  ran_once = false;
  # if @team.id
  #   @result = Draft.find(@team.id)
  # else
  #   return nil
  # end
  # check whether batter or pitcher1_id
  9.times do |player|
    playerindex = "player" + (player + 1).to_s + "_id"
    yearindex = "player" + (player + 1).to_s + "_yearid"
    if @result[playerindex.to_sym] == nil && ran_once == false
      @result[playerindex.to_sym] = params[:name]
      @result[yearindex.to_sym] = params[:year]
      @result.save
      ran_once = true
    end
  end
  return @result.to_json
end

post '/selectpitcher' do
  puts params
  @result = Draft.find_by(team_name: session[:current_team])
  ran_once = false
  # if @team.id
  #   @result = Draft.find(@team.id)
  # else
  #   return nil
  # end
  # check whether batter or pitcher1_id
  7.times do |player|
    playerindex = "pitcher" + (player + 1).to_s + "_id"
    yearindex = "pitcher" + (player + 1).to_s + "_yearid"
    if @result[playerindex.to_sym] == nil && ran_once == false
      @result[playerindex.to_sym] = params[:name]
      @result[yearindex.to_sym] = params[:year]
      @result.save
      ran_once = true
    end
  end
  return @result.to_json
end



get '/random' do
  @team = session[:current_team]
  @playersarray = Array.new
  totalrecords = Player.count
  10.times do |item|
    item = Player.offset(rand * totalrecords).first
      playerhash = item.attributes
      playerhash[:batting] = item.batting_records
      playerhash[:pitching] = item.pitching_records
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
    playerhash[:pitching] = player.pitching_records
    @playersarray.push(playerhash)
  end
  return @playersarray.to_json
end

get '/savedraft' do

  record = League.find_by(league_name: session[:current_league])
  team = session[:current_team]
  if record.team1_owner == session[:current_account]
    record.team1_name = team
  else
    record.team2_name = team
  end
  record.save
  redirect "/league/myleagues/" + session[:current_league]

end

end
