# History At Bat

#### WDI - Project 2 - Peer Programming
#### Jason Tham
#### Martin Ryan

![Vintage Baseball](http://www.hardballtimes.com/wp-content/uploads/2015/02/Baseball_Vintage-9.jpg)

## Installation Instructions
1. Create Ubuntu 14.04 x64 server
2. Download serverSetup.sh (in the root of the repository) and run it from the terminal with the commands:
```
sudo chmod 755 serverSetup.sh
sudo ./serverSetup.sh
```
3. clone down the repository from github with the command:
```
git clone git@github.com:DeveloperTools/WDI_Project2.git
```
4. Open psql as root and import all the .sql files in the db folder you just cloned down from github.  You must import createdb.sql first, then you can import all the others.  You can do this with the command:
```
\i /githubprojectfolder/db/filename.sql
```
5. If you imported the database files with no error, you should be ready to run the web server.  Navigate to the root of the cloned repository and run the following commands to build all dependencies and run the web server:
```
bundle
nohup bundle exec rackup -p 80 --host 0.0.0.0 &
```
6. If you were able to build all the dependencies with the bundler your webserver will now be running on port 80 and the nohup command ensures it will run even after you logout.  After you run the nohup command, nohup will list the process id number in the terminal window.  If you need to stop running the webserver you can kill it with the following command:
```
sudo kill -9 processid
```
