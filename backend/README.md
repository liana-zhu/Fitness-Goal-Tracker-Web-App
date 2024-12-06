For everyone:
Install java extension pack and sprint boot extension pack on vscode
In src/main/java/csci201/backend/resources/application.properties change spring.datasource.password=password to your MySQL password
To start project, run BackEndApplication.java to start SpringBoot project via run button (Run React project at the same time via npm start after npm install -> see frontend's README.md)

For front-end:
All the apis you guys will call are in src/main/java/csci201/backend/controller. 
Plz call apis using fetch with the url SpringBoot is hosted on i.e. "http://localhost:8080 + whatever is in the RequestMapping annotation for the controller/api you want to call
Ex. for the LoginController the sign-in/handle-submit function calls using fetch("http://localhost:8080/api/auth/login") where /api/auth/login was what is in the RequestMapping annotation for LoginController

For back-end:
Curently, this project has these dependencies: SpringWeb (for APIs), Spring Data JPA (for database modeling/queries), mySQL Driver (obvious), Lombok (for boilerplate code), and Spring DevTools (so we don't have to restart SpringBoot everytime we make a change). 
If you want to add more dependecies, feel free to do so in pom.xml where all the dependencies are listed. 
Note: Added Spring Security initially but removed it since it blocks React (which can be fixed), but wasn't planning to use any of its features anyways.

All the files we working will be working on are in src/main/java/csci201/backend.
Our files here are categorized into the config, controller, entity, repository, and service folders.

For config, the file in there currently allows React to communicate with SpringBoot. 
If you encounter any CORS errors or issues with React aka localhost:3000 failing to communicate with SpringBoot aka localhost:8080, you can fix it here most likely. 
Otherwise, just leave as is.

All the folders work in conjuction with each other. Imma use how I implemented the login feature as an example to show a general idea of how this works, but you should visit each folder/file to see specifics.

First, I go to the entity folder and model the generated "user" table in my mySQL databse to a class called User.java that will represent that table (aka an entity). This should be done once for every TABLE we're working on. (PLZ make sure all the names of columns and tables generated in your database are lowercase. Change the SQL script to reflect this. This makes sending queries to the database much easier and less buggy. U can also name stuff using '_'.)

Next, I go to the repository folder to make a repository for that entity aka UserRepository.java. Here, you will write all the queries associated w/ that table via the JPA format. My query findByUsernameOrUserEmail is equivalent to 
SELECT *
FROM User
WHERE username = ? OR user_email = ?;
How you may ask? Idk. We should make a repository for every TABLE we have and write all our queries for that table there.

Next, I go to service folder to implement the logic behind the feature I'm working on i.e. authenticating users when they log in, using the info from executing the query (defined in the repository) and the request parameters passed to me by the front-end in the controller/api call. Then, if everything's good I return what I want i.e. userID or if somethings wrong, I throw an exception with an error message saying what was wrong. We should implement a service for every FEATURE we're implementing.

Finally, I go to the controller to write the API for the frontend to call for the feature I'm working on i.e. login. The Request Mapping annotation shows the path the front-end should call so it should be named somewhat close to the feature you're working on e.g. for login it's /api/auth/login. Then, you try to execute the service w/ the request parameters u get and if u succeed, u can return wat u want, which here is the userID for the front-end to use or if u fail, u can catch the error and return the error message to the front-end.

So TLDR, front-end calls fetch(api) in js -> goes to matching api in controller -> controller tries logic in service -> service uses request parameters from controller and query in repository -> query in repository uses data in entity -> entity's data is mapped to database and then it goes all the way back up to the api call to return what the front-end needs after we've updated our end. Note: Notice how files are linked via import or the AutoWired annotation to build this kind of chain

Dis my first time using Spring Boot so I'm not 100% sure this is all correct but this is the general idea I have after implementing the login feature. Feel free to add if u know anything more! Documentation on the dependencies are also in HELP.MD if yall want to read up on them. I also edited the script for the users table in the mySQL database to use all lowercase and _. This seems complicated but its not that much code since it's split up over many files. Feel free to ask me if u have any questions! (although I'm prob just gonna ChatGPT them)
