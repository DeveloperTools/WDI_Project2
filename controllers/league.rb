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
    league_check
    session[:current_league] = params[:league_name]
    erb :league_page
  end

  get '/myleagues/:league_name/results' do
    league_check
  end

  get '/myleagues/:league_name/simulation' do
    league_check
    @teams = League.find(params[:league_name]).teams
    @teams.each do |team|
      @stats = Hash.new
      @stats[:playerid] = team.player1_id
      @stats[:yearid] = team.player1_yearid
      batting = nil
      Player.find(team.player1_id).batting_records.each do |bat|
        if bat.yearid == @stats[:yearid].to_i
          batting = bat
        end
        p bat
      end
      binding.pry
      results = simulate_batting(batting,atbats)
      team.r_total = results[:r]
      team.h_total = results[:h]
      team.ab_total = results[:ab]
      team.hr_total = results[:hr]
      team.rbi_total = results[:rbi]
      team.sb_total = results[:sb]
      team.save
    end
    redirect 'myleagues/' + params[:league_name]
  end

  def league_check
    @err_message = "That League does not exist"
    League.all.each do |l|
      if l.league_name == params[:league_name]
        @err_message = nil
      end
    end
    if @err_message
      session[:error_league] = @err_message
      redirect '/league'
    end
  end

  def simulate_batting(stats,abs)
    results = Hash.new
    results = {:hr => 0,
      :r => 0,
      :rbi => 0,
      :ab => 0,
      :h =>0,
      :sb =>0 }
    abs.times do
      if stats.ab > 0
        ba = (stats.h.to_f/stats.ab.to_f)
        hr_ratio = (stats.hr.to_f/stats.h.to_f)
        run_ratio = (stats.r.to_f/stats.h.to_f)
        sb_ratio = (stats.sb.to_f/stats.h.to_f)
        rbi_ratio = (stats.rbi.to_f/stats.h.to_f)
        if rand < ba
          results[:h] += 1
          hit = true
          p "Hit"
        end
        if hit

          if rand < hr_ratio
            results[:hr] += 1
            results[:r] += 1
            results[:rbi] += [1,2,3,4].sample
            p "Homerun"
          else
            if rand < run_ratio
            results[:r] += 1
            p "run"
            end
            results[:rbi] += [0,1,2,3].sample
            if rand < sb_ratio
              results[:sb] += 1
            end
          end
        end
      end
      results[:ab] += 1
    end
    return results
  end

  def atbats
    case rand.round(2)
    when 0 .. 0.04
      3
    when 0.05 .. 0.84
      4
    when 0.85 .. 0.94
      5
    else
      6
    end
  end
end
