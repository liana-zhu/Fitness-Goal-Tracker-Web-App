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

/* CREATE TABLE Exercise(
    exerciseID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    exerciseName VARCHAR(20) NOT NULL
); */

CREATE TABLE workout(
    workout_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL, 
    workout_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    workout_type ENUM('Weights', 'Cardio') NOT NULL,
    workout_name VARCHAR(100) NOT NULL,
    num_sets INT DEFAULT NULL,
    duration INT NOT NULL, -- mins
    FOREIGN KEY (user_id) REFERENCES user(user_id),
);

/*CREATE TABLE WorkoutGoal(
    workoutGoalID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL, 
	exerciseID INT NOT NULL,
    isAccomplished bool NOT NULL,
    numReps INT,
    numSets INT,
    durationTimeMin INT,
    restTimeMin INT,
	distanceMiles INT,
    speedMph INT,
    avgBpm INT,
    FOREIGN KEY (userId) REFERENCES User(userID),
	FOREIGN KEY (exerciseID) REFERENCES Exercise(exerciseID)
);*/

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

/*CREATE TABLE CustomCalorie(
    customCalorieID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    foodName VARCHAR(20),
    calorieTimestamp timestamp NOT NULL,
    totalCalorieIntake INT,
    proteinCalorieIntake INT,
    fatCalorieIntake INT,
    carbCalorieIntake INT,
    fiberCalorieIntake INT
); */

-- DELIMITER $$
-- CREATE TRIGGER UpdateWorkoutGoal1
-- AFTER INSERT ON Workout
-- FOR EACH ROW
-- begin
-- 		DECLARE isAccomplished Boolean;
-- 		SELECT true
-- 		INTO @isAccomplised
-- 		FROM WorkoutGoal
-- 		WHERE (NEW.numReps >= WorkoutGoal.numReps OR WorkoutGoal.numReps is NULL) AND
-- 				(NEW.numSets >= WorkoutGoal.numSets OR WorkoutGoal.numReps is NULL) AND
-- 				(NEW.durationTimeMin >= WorkoutGoal.durationTimeMin OR WorkoutGoal.durationTimeMin is NULL) AND
-- 				(NEW.restTimeMin >= WorkoutGoal.restTimeMin OR WorkoutGoal.restTimeMin is NULL) AND
-- 				(NEW.distanceMiles >= WorkoutGoal.distanceMiles OR WorkoutGoal.distanceMiles is NULL) AND
-- 				(NEW.speedMph >= WorkoutGoal.speedMph OR WorkoutGoal.speedMph is NULL) AND
-- 				(NEW.avgBpm >= WorkoutGoal.avgBpm OR WorkoutGoal.avgBpm is NULL);
-- 		IF @isAccomplished = true
-- 		THEN
-- 			UPDATE WorkoutGoal
-- 			SET isAccomplised = true
-- 			WHERE WorkoutGoal.userID = NEW.userID AND WorkoutGoal.exerciseID = NEW.exerciseID;
-- 		END IF;
-- END;

-- DELIMITER $$
-- CREATE TRIGGER UpdateWorkoutGoal2
-- AFTER INSERT ON WorkoutGoal
-- FOR EACH ROW
-- begin
-- 		DECLARE isAccomplished Boolean;
-- 		SELECT true
-- 		INTO @isAccomplised
-- 		FROM Workout
-- 		WHERE (Workout.numReps >= NEW.numReps OR NEW.numReps is NULL) AND
-- 				(Workout.numSets >= NEW.numSets OR NEW.numReps is NULL) AND
-- 				(Workout.durationTimeMin >= NEW.durationTimeMin OR NEW.durationTimeMin is NULL) AND
-- 				(Workout.restTimeMin >= NEW.restTimeMin OR NEW.restTimeMin is NULL) AND
-- 				(Workout.distanceMiles >= NEW.distanceMiles OR NEW.distanceMiles is NULL) AND
-- 				(Workout.speedMph >= NEW.speedMph OR NEW.speedMph is NULL) AND
-- 				(Workout.avgBpm >= NEW.avgBpm OR NEW.avgBpm is NULL);
-- 		IF @isAccomplished = true
-- 		THEN
-- 			UPDATE WorkoutGoal
-- 			SET isAccomplised = true
-- 			WHERE WorkoutGoal.userID = NEW.userID AND WorkoutGoal.exerciseID = NEW.exerciseID;
-- 		END IF;
-- END;


/* CREATE TRIGGER UpdateWorkoutGoal1
AFTER INSERT ON Workout
FOR EACH ROW
	UPDATE WorkoutGoal
		SET isAccomplished = true
	WHERE (WorkoutGoal.userID = NEW.userID AND WorkoutGoal.exerciseID = NEW.exerciseID) AND
				(NEW.numReps >= WorkoutGoal.numReps OR WorkoutGoal.numReps is NULL) AND
				(NEW.numSets >= WorkoutGoal.numSets OR WorkoutGoal.numReps is NULL) AND
				(NEW.durationTimeMin >= WorkoutGoal.durationTimeMin OR WorkoutGoal.durationTimeMin is NULL) AND
				(NEW.restTimeMin >= WorkoutGoal.restTimeMin OR WorkoutGoal.restTimeMin is NULL) AND
				(NEW.distanceMiles >= WorkoutGoal.distanceMiles OR WorkoutGoal.distanceMiles is NULL) AND
				(NEW.speedMph >= WorkoutGoal.speedMph OR WorkoutGoal.speedMph is NULL) AND
				(NEW.avgBpm >= WorkoutGoal.avgBpm OR WorkoutGoal.avgBpm is NULL); */
