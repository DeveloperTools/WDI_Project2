class AccountController < ApplicationController

  def authorization_check

    if session[:current_user] == nil

      @message = "Please log in to play ball!"
      redirect "/"

    else

      return true

    end

  end

  get "/" do

    erb :login

  end

  post "/" do

    # ACCOUNT LOGIN
    #
    if params[:login_name] && params[:login_password]

      login_account = Account.authenticate(params[:login_name], params[:login_password])

      if login_account

        session[:current_account] = login_account.account_name
        redirect "/account_profile"

      else

        @message = "Your email or password is incorrect"
        erb :login

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

      session[:current_account] = new_account.account_name

      redirect "/account_profile"

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
