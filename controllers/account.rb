class AccountController < ApplicationController

  get "/" do

    erb :login

  end

  post "/" do

    # ACCOUNT LOGIN
    #
    # login_account = Account.authenticate(params[:login_email], params[:login_password])
    #
    # if login_account
    #   session[:current_account] = login_account
    #   redirect "/account_profile"
    # else
    #   @message = "Your email or password is incorrect"
    #   # erb :login
    # end

    # ACCOUNT CREATE
    #
    new_account = Account.create(
    :account_name => params[:create_account_name],
    :account_email => params[:create_account_email],
    :password => params[:create_account_password]
    )

    p new_account

    session[:current_account] = new_account

  end

  get "/account_profile" do
    # @account_record = Account.find_by(:account_email => login_email)
    erb :account_profile
  end

end
