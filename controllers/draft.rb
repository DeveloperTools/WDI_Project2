class DraftController < ApplicationController

get '/' do
  @user = Account.find_by(account_name: session[:current_user])
  erb :draft
end

get '/live' do
  @draft = Draft.create(
    :team_owner => params[:user_name]

  )
end


end
