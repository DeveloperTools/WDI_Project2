class AccountController < ApplicationController

  get "/" do
    
    p params

    erb :login

  end

end
