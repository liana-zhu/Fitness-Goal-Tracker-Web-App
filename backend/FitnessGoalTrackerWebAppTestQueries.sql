USE FitnessGoalTrackerWebApp;

SELECT Exercise.exerciseName, Workout.workoutTimestamp
FROM Workout
JOIN Exercise ON Workout.exerciseID = Exercise.exerciseID
WHERE Workout.userID = 1
ORDER BY Workout.workoutTimestamp;




