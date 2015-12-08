class DraftController < ApplicationController

get '/' do
  @user = Account.find_by(account_name: session[:current_user])
  erb :draft
end

post '/' do
  @team = Draft.create(
    :team_owner => params[:user_name],
    :team_name => params[:team_name],
    :league_name => params[:league_name]
  )
  redirect '/live'
end

get '/live' do
  erb :live
end

post '/#' do
  
end
