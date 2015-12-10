class AccountController < ApplicationController

  def authorization_check

    if session[:current_user] == nil

      session[:login_message] = "Login to play ball!"
      redirect "/"

    end

  end

  # RENDER LOGIN VIEWS
  #
  get "/" do

    erb :login

  end

  # RECEIVE LOGIN OR CREATE DATA AND REDIRECT ACCORDINGLY
  #
  post "/" do

    # ACCOUNT LOGIN
    #
    if params[:login_name] && params[:login_password]

      login_account = Account.authenticate(params[:login_name], params[:login_password])

      if login_account

        session[:login_message] = nil
        session[:current_account] = login_account.account_name
        redirect "/league"

      else

        session[:login_message] = "Your email or password is incorrect"
        redirect "/"

      end

    end

    # ACCOUNT CREATE
    #
    if params[:create_account_name] && params[:create_account_password]

      new_account = Account.create(
      :account_name => params[:create_account_name],
      :account_email => params[:create_account_email],
      :password => params[:create_account_password]
      )

      session[:login_message] = nil
      session[:current_account] = new_account.account_name
      redirect "/league"

    end

  end

  get "/account_profile" do

    erb :account_profile

  end

  get "/logout" do

    session[:current_user] = nil
    authorization_check

  end

end
