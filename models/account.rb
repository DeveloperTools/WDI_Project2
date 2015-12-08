class Account < ActiveRecord::Base

  include BCrypt
  # setter for password
  # look up equal sign
  def password=(pwd)
    self.password_digest = BCrypt::Password.create(pwd)
  end

  # getter for password
  def password
    BCrypt::Password.new(self.password_digest)
  end

  # create a method to test if we are allowed authorization so we need to authenticate
  # we log in with a user name and password...this method handles all that on the backend
  def self.authenticate(login_email, login_password)
    current_account = Account.find_by(:account_email => login_email)
    p current_account.password
    # return our current user if passwords match
    # if (current_account.password == login_password)
    #   return current_account
    # else
    #   return nil
    # end

  end

end
