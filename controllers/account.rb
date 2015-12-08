class AccountController < ApplicationController

  get "/" do

    erb :login

  end

  post "/" do

    user = Account.authenticate(params[:login_email], params[:login_password])
    # if user
    #   session[:current_user] = user
    #   redirect "/account_profile"
    # else
    #   @message = "Your password or account is incorrect"
    #   erb :login
    # end

    new_account = Account.create(
    :account_name => params[:create_account_name]¬,
    :account_email => params[:create_account_email],
    :password => params[:password]
    )

    session[:current_user] = new_account

    p session
    p params
  end

end
