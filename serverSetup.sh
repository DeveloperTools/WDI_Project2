apt-get update -y
apt-get install ruby-dev -y
apt-get install build-essential -y
apt-get install git -y
apt-get install postgresql -y
apt-get install postgresql-contrib -y
sudo -i -u postgres createuser -s root
exit
sudo -i -u postgres createdb root
exit
touch ~/.psql_history
apt-get install libpq-dev
gem install pg
gem install json -v 1.8.2
gem install bundler
