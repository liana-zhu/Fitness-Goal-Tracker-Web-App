DROP DATABASE IF EXISTS FitnessGoalTrackerWebApp;
CREATE DATABASE FitnessGoalTrackerWebApp;
USE FitnessGoalTrackerWebApp;

-- NOTE FOR FRONT-END: workout, weight, and calories tables assume date/time for an entry don't need to be provided and can't be edited by a user.
-- They generate date/time for an entry via a timestamp on insert (makes formatting for date/time more consistent on the back-end to sort),
-- plz adjust front-end to reflect this or let us know if user input for date/time is important to any function so we can adjust

-- NOTE FOR BACK-END: if u change a table's structure, make sure change is reflected in the corresponding entity 

CREATE TABLE user(
    user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
	user_password VARCHAR(64) NOT NULL,
	user_email VARCHAR(100) NOT NULL
);

CREATE TABLE workout(
    workout_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL, 
    workout_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    workout_type ENUM('weights', 'cardio') NOT NULL,
    workout_name VARCHAR(100) NOT NULL,
    num_sets INT DEFAULT NULL,
    duration INT NOT NULL, -- mins
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE weight(
    weight_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL, 
    weight_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    weight_val INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE calories(
    calories_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL, 
    calories_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    food_name VARCHAR(50) NOT NULL,
    calories INT NOT NULL,
    protein INT NOT NULL,
    carbs INT NOT NULL,
    fat INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);
