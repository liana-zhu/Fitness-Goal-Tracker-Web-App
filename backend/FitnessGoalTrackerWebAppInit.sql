DROP DATABASE IF EXISTS FitnessGoalTrackerWebApp;
CREATE DATABASE FitnessGoalTrackerWebApp;
USE FitnessGoalTrackerWebApp;

CREATE TABLE User(
    userID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
	userPassword VARCHAR(20) NOT NULL,
	firstName VARCHAR(20) NOT NULL,
	lastName VARCHAR(20) NOT NULL
);

CREATE TABLE Exercise(
    exerciseID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    exerciseName VARCHAR(20) NOT NULL
);

CREATE TABLE Workout(
    workoutID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL, 
	exerciseID INT NOT NULL,
    workoutTimestamp timestamp NOT NULL,
    numReps INT,
    numSets INT,
    durationTimeMin INT,
    restTimeMin INT,
	distanceMiles INT,
    speedMph INT,
    avgBpm INT,
    FOREIGN KEY (userId) REFERENCES User(userID),
	FOREIGN KEY (exerciseID) REFERENCES Exercise(exerciseID)
);

CREATE TABLE WorkoutGoal(
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
);

CREATE TABLE Weight(
    weightID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL, 
    weightTimestamp timestamp NOT NULL,
    weight INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(userID)
);

CREATE TABLE Calorie(
    calorieID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL, 
    calorieTimestamp timestamp NOT NULL,
    totalCalorieIntake INT,
    proteinCalorieIntake INT,
    fatCalorieIntake INT,
    carbCalorieIntake INT,
    fiberCalorieIntake INT,
    customCalorieID INT,
    FOREIGN KEY (userId) REFERENCES User(userID)
);

CREATE TABLE CustomCalorie(
    customCalorieID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    foodName VARCHAR(20),
    calorieTimestamp timestamp NOT NULL,
    totalCalorieIntake INT,
    proteinCalorieIntake INT,
    fatCalorieIntake INT,
    carbCalorieIntake INT,
    fiberCalorieIntake INT
);

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


CREATE TRIGGER UpdateWorkoutGoal1
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
				(NEW.avgBpm >= WorkoutGoal.avgBpm OR WorkoutGoal.avgBpm is NULL);
