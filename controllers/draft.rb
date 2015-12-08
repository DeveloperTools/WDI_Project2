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
  binding.pry
  redirect 'draft/live'
end

get '/live' do
  erb :live
end

post '/#' do

end

end
