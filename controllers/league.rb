class LeagueController < ApplicationController
  get '/' do
    erb :league
  end

  post '/create' do
    # @err_message = nil
    # League.all.each do |l|
    #   if l.league_name == params[:league_name]
    #     @err_message = 'This League already exists'
    #   end
    # end
    # @league = League.create(
    # :league_name => params[:league_name],
    # :team1_owner => params[:team1_owner],
    # :team2_owner => params[:team2_owner]
    # )
    @league = League.create(
    :league_name => params[:league_name],
    :team1_owner => params[:team1_owner],
    :team2_owner => params[:team2_owner]
    )
    return @league.to_json
    # params[:current_league] = @league[:league_name]
  end
  #
  # RETURNS LEAGUES OWNED BY ACCOUNT
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
    erb :league_detail
  end

  get '/myleagues/:league_name/results' do
    league_check
    @teams = League.find(params[:league_name]).teams
    # if League.find(params[:league_name]).simulationcomplete = false
    #   return
    # end
    @result = Array.new

    return @teams.to_json
  end

  get '/myleagues/:league_name/teams' do
    league_check
    @teams = League.find(params[:league_name]).teams
    @result = Hash.new
    teamnum = 0
    @teams.each do |team|
      @players = Array.new
      teamnum += 1
      9.times do |player|
        playerindex = "player" + (player + 1).to_s + "_id"
        yearindex = "player" + (player + 1).to_s + "_yearid"
        playerid = team[playerindex.to_sym]
        if playerid
          playername = Player.find(playerid).namefirst + " " + Player.find(playerid).namelast
          playeryear = team[yearindex.to_sym]
          @players.push(playername + " " + playeryear)
        end
      end
      7.times do |pitcher|
        pitcherindex = "pitcher" + (pitcher + 1).to_s + "_id"
        yearindex = "pitcher" + (pitcher + 1).to_s + "_yearid"
        pitcherid = team[pitcherindex.to_sym]
        if pitcherid
          pitchername = Player.find(pitcherid).namefirst + " " + Player.find(pitcherid).namelast
          pitcheryear = team[yearindex.to_sym]
          @players.push(pitchername + " " + pitcheryear)
        end
      end
      teamindex = "team" + teamnum.to_s
      @players.push(@team.team_name)
      @players.push(@team.team_owner)
      @result[teamindex.to_sym] = @players
    end
    return @result.to_json
  end

  get '/myleagues/:league_name/simulation' do
    league_check
    @teams = League.find_by(league_name: params[:league_name]).teams
    @teams.each do |team|
      team.r_total = 0
      team.h_total = 0
      team.ab_total = 0
      team.hr_total = 0
      team.rbi_total = 0
      team.sb_total = 0
      9.times do |batter|
        playerid = "player" + (batter + 1).to_s + "_id"
        yearid = "player" + (batter + 1).to_s + "_yearid"
        @stats = Hash.new
        @stats[:playerid] = team[playerid.to_sym]
        @stats[:yearid] = team[yearid.to_sym]
        batting = nil
        Player.find(team[playerid.to_sym]).batting_records.each do |bat|
          if bat.yearid == @stats[:yearid].to_i
            batting = bat
          end
          p bat
        end
        results = simulate_batting(batting,atbats)
        team.r_total += results[:r]
        team.h_total += results[:h]
        team.ab_total += results[:ab]
        team.hr_total += results[:hr]
        team.rbi_total += results[:rbi]
        team.sb_total += results[:sb]
        team.save
      end
      team.er_total = 0
      team.ip_total = 0
      team.k_total = 0
      team.sv_total = 0
      team.w_total = 0
      7.times do |pitcher|
        pitcherid = "pitcher" + (pitcher + 1).to_s + "_id"
        yearid = "pitcher" + (pitcher + 1).to_s + "_yearid"
        @stats = Hash.new
        @stats[:pitcherid] = team[pitcherid.to_sym]
        @stats[:yearid] = team[yearid.to_sym]
        pitching = nil
        Player.find(team[pitcherid.to_sym]).pitching_records.each do |pitch|
          if pitch.yearid == @stats[:yearid].to_i
            pitching = pitch
          end
          p pitch
        end
        pitchresults = simulate_pitching(pitching,innings)
        team.w_total += pitchresults[:w]
        team.er_total += pitchresults[:er]
        team.ip_total += pitchresults[:ip]
        team.k_total += pitchresults[:k]
        team.sv_total += pitchresults[:sv]
        team.save
      end
      team.era_total = (team.er_total.to_f * 9.to_f / team.ip_total.to_f).round(2)
      team.ba_total = (team.h_total.to_f / team.ab_total.to_f).round(3)
      team.save
    end
    # redirect '/league/myleagues/' + params[:league_name]
    return @teams.to_json
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
      :sb =>0}
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

  def simulate_pitching(stats,inpitched)
    results = Hash.new
    results = {:w => 0,
      :k => 0,
      :ip => 0,
      :er => 0,
      :sv => 0}
    iptotal = stats.ipouts/3
    w_ratio = stats.w.to_f/stats.g.to_f
    k_ratio = stats.so.to_f/iptotal.to_f
    er_ratio = stats.er.to_f/iptotal.to_f
    sv_ratio = stats.sv.to_f/stats.g.to_f
    if rand < w_ratio
      results[:w] += 1
    else
      if stats.sv > 2
        if rand < sv_ratio
          results[:sv] += 1
        end
      end
    end
    results[:ip] += inpitched
    results[:k] = (k_ratio*inpitched).to_i
    results[:er] = (er_ratio*inpitched).to_i
    return results
  end

  def innings
    case rand.round(2)
    when 0 .. 0.04
      4
    when 0.05 .. 0.45
      5
    when 0.46 .. 0.79
      6
    when 0.80 .. 0.89
      7
    when 0.90 .. 0.96
      8
    else
      9
    end
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
