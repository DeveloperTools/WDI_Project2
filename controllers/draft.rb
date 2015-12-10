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
  session[:current_team] = @team.id
  redirect '/draft/live'
end

get '/live' do
  @team = Draft.find(session[:current_team])
  erb :live
end

post '/select' do
  puts params
  @result = Draft.find(session[:current_team])
  # if @team.id
  #   @result = Draft.find(@team.id)
  # else
  #   return nil
  # end
  # check whether batter or pitcher1_id
  9.times do |player|
    playerindex = "player" + (player + 1).to_s + "_id"
    yearindex = "player" + (player + 1).to_s + "_yearid"
    if @result[playerindex.to_sym] == nil
      @result[playerindex.to_sym] = params[:name]
      @result[yearindex.to_sym] = params[:year]
      @result.save
      return p "added player to team"
    end
  end
  return p "team full"
end

post '/selectpitcher' do
  puts params
  @result = Draft.find(session[:current_team])
  # if @team.id
  #   @result = Draft.find(@team.id)
  # else
  #   return nil
  # end
  # check whether batter or pitcher1_id
  7.times do |player|
    playerindex = "pitcher" + (player + 1).to_s + "_id"
    yearindex = "pitcher" + (player + 1).to_s + "_yearid"
    if @result[playerindex.to_sym] == nil
      binding.pry
      @result[playerindex.to_sym] = params[:name]
      @result[yearindex.to_sym] = params[:year]
      @result.save
      return p "added pitcher to team"
    end
  end
  return p "team full"
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


end
