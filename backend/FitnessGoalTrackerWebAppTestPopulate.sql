USE FitnessGoalTrackerWebApp;

-- Insert into User table
INSERT INTO User (username, userPassword, firstName, lastName) VALUES ('markz', 'pass123', 'Mark', 'Zane');
INSERT INTO User (username, userPassword, firstName, lastName) VALUES ('emily_r', 'emilysecure', 'Emily', 'Roberts');
INSERT INTO User (username, userPassword, firstName, lastName) VALUES ('tommy_j', 'tommy2024', 'Tommy', 'Jones');

-- Insert into Exercise table
INSERT INTO Exercise (exerciseName) VALUES ('Pull-Ups');
INSERT INTO Exercise (exerciseName) VALUES ('Deadlift');
INSERT INTO Exercise (exerciseName) VALUES ('Rowing');
INSERT INTO Exercise (exerciseName) VALUES ('Plank');
INSERT INTO Exercise (exerciseName) VALUES ('Swimming');

-- Insert into Workout table
INSERT INTO Workout (userID, exerciseID, workoutTimestamp, numReps, numSets, durationTimeMin, restTimeMin, distanceMiles, speedMph, avgBpm) 
VALUES (1, 2, '2024-12-02 10:00:00', 8, 4, NULL, NULL, NULL, NULL, 120);
INSERT INTO Workout (userID, exerciseID, workoutTimestamp, numReps, numSets, durationTimeMin, restTimeMin, distanceMiles, speedMph, avgBpm) 
VALUES (2, 4, '2024-12-02 11:00:00', NULL, NULL, 5, 2, NULL, NULL, 115);
INSERT INTO Workout (userID, exerciseID, workoutTimestamp, numReps, numSets, durationTimeMin, restTimeMin, distanceMiles, speedMph, avgBpm) 
VALUES (3, 5, '2024-12-03 07:00:00', NULL, NULL, 60, 10, 1.2, 2, 125);
INSERT INTO Workout (userID, exerciseID, workoutTimestamp, numReps, numSets, durationTimeMin, restTimeMin, distanceMiles, speedMph, avgBpm) 
VALUES (1, 3, '2024-12-03 08:30:00', 15, 3, NULL, NULL, 10, 10, 140);

-- Insert into WorkoutGoal table
INSERT INTO WorkoutGoal (userID, exerciseID, isAccomplished, numReps, numSets, durationTimeMin, restTimeMin, distanceMiles, speedMph, avgBpm) 
VALUES (1, 2, FALSE, 10, 3, NULL, 2, NULL, NULL, 135);
INSERT INTO WorkoutGoal (userID, exerciseID, isAccomplished, numReps, numSets, durationTimeMin, restTimeMin, distanceMiles, speedMph, avgBpm) 
VALUES (2, 4, FALSE, NULL, NULL, 5, 1, NULL, NULL, 115);
INSERT INTO WorkoutGoal (userID, exerciseID, isAccomplished, numReps, numSets, durationTimeMin, restTimeMin, distanceMiles, speedMph, avgBpm) 
VALUES (3, 5, FALSE, NULL, NULL, 60, 8, 1.2, 2, 125);
INSERT INTO WorkoutGoal (userID, exerciseID, isAccomplished, numReps, numSets, durationTimeMin, restTimeMin, distanceMiles, speedMph, avgBpm) 
VALUES (1, 3, FALSE, 15, 4, NULL, 3, NULL, NULL, 140);

-- Insert into Weight table
INSERT INTO Weight (userID, weightTimestamp, weight) VALUES (1, '2024-12-02 07:00:00', 178);
INSERT INTO Weight (userID, weightTimestamp, weight) VALUES (2, '2024-12-02 08:00:00', 152);
INSERT INTO Weight (userID, weightTimestamp, weight) VALUES (3, '2024-12-03 07:30:00', 198);

-- Insert into Calorie table
INSERT INTO Calorie (userID, calorieTimestamp, totalCalorieIntake, proteinCalorieIntake, fatCalorieIntake, carbCalorieIntake, fiberCalorieIntake, customCalorieID) 
VALUES (1, '2024-12-02 18:00:00', 2200, 600, 500, 800, 300, 4);
INSERT INTO Calorie (userID, calorieTimestamp, totalCalorieIntake, proteinCalorieIntake, fatCalorieIntake, carbCalorieIntake, fiberCalorieIntake, customCalorieID) 
VALUES (2, '2024-12-02 19:00:00', 1800, 400, 350, 700, 200, 5);
INSERT INTO Calorie (userID, calorieTimestamp, totalCalorieIntake, proteinCalorieIntake, fatCalorieIntake, carbCalorieIntake, fiberCalorieIntake, customCalorieID) 
VALUES (3, '2024-12-03 20:00:00', 2500, 700, 600, 1000, 200, 6);

-- Insert into CustomCalorie table
INSERT INTO CustomCalorie (foodName, calorieTimestamp, totalCalorieIntake, proteinCalorieIntake, fatCalorieIntake, carbCalorieIntake, fiberCalorieIntake) 
VALUES ('Avocado Toast', '2024-12-02 08:00:00', 400, 80, 200, 100, 20);
INSERT INTO CustomCalorie (foodName, calorieTimestamp, totalCalorieIntake, proteinCalorieIntake, fatCalorieIntake, carbCalorieIntake, fiberCalorieIntake) 
VALUES ('Protein Bar', '2024-12-02 15:00:00', 250, 200, 50, NULL, NULL);
INSERT INTO CustomCalorie (foodName, calorieTimestamp, totalCalorieIntake, proteinCalorieIntake, fatCalorieIntake, carbCalorieIntake, fiberCalorieIntake) 
VALUES ('Grilled Chicken', '2024-12-02 19:30:00', 600, 400, 100, 80, 20);
