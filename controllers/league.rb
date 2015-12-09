class LeagueController < ApplicationController
  get '/' do
    erb :league
  end

  get '/create' do
    erb :create_league
  end

  post '/create' do
    # if League.find_by(params[:league_name])

    # end
    @err_message = nil
    League.all.each do |l|
      if l.league_name == params[:league_name]
        @err_message = 'This League already exists'
        erb :create_league
      end
    end
    @league = League.create(
    :league_name => params[:league_name],
    :team1_owner => params[:team1_owner],
    :team2_owner => params[:team2_owner]
    )
    params[:current_league] = @league[:league_name]
    redirect '/league'
  end

  get '/myleagues' do
    @myleagues = Array.new
    League.all.each do |l|
      if l.team1_owner == session[:current_account] || l.team2_owner == session[:current_account]
        @myleagues.push(l);
      end
    end
    return @myleagues.to_json
  end

  get '/myleagues/:league_name' do
    @err_message = "This League does not exist"
    League.all.each do |l|
      if l.league_name == params[:league_name]
        @err_message = nil
      end
    end
    if @err_message
      session[:error_league] = @err_message
      redirect '/league'
    end
    session[:current_league] = params[:league_name]
    erb :league_page
  end
end
