# qhrms-nodejs
nodejs part 

Steps to start the server:

> Get in to ./server

> Rename name the ".env.template" to ".env" and replace the appropriate values

> run "npm install" to install the node modules

> This application uses forever node package to manage process/logs. 
	> run "npm install forever -g" to install forever globally

> run "npm start" to start the server. 

> Server logs can be found in the user home directory (.forever)

> Postman collection json for the APIs can be found in "lib" directory. Import the postman collection which has all the API details

> run "npm stop" to stop the server.


Attached postman collections under lib folder, please import the file in Postman 
1. create user using the create user api 
2. and then try with login from front end
