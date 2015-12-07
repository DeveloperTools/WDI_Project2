require "bundler"
Bundler.require

get '/' do
  erb :hello
end
