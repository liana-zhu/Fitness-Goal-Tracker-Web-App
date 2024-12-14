package csci201.backend.service;

import csci201.backend.entity.Workout;
import csci201.backend.entity.Weight;
import csci201.backend.entity.Calories;
import csci201.backend.repository.WorkoutRepository;
import csci201.backend.repository.WeightRepository;
import csci201.backend.repository.CaloriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashHistoryService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private WeightRepository weightRepository;

    @Autowired
    private CaloriesRepository caloriesRepository;

    public List<RecentActivity> getRecentActivities(int userId) {
        // Fetch recent entries from each table
        List<RecentActivity> activities = new ArrayList<>();

        // Fetch workouts
        List<Workout> workouts = workoutRepository.findTop3ByUserIdOrderByWorkoutTimestampDesc(userId);
        for (Workout workout : workouts) {
            activities.add(new RecentActivity(
                "Workout logged",
                workout.getWorkoutName(),
                null,
                Timestamp.valueOf(workout.getWorkoutTimestamp())
            ));
        }

        // Fetch weights
        List<Weight> weights = weightRepository.findTop3ByUserIdOrderByWeightTimestampDesc(userId);
        for (Weight weight : weights) {
            activities.add(new RecentActivity(
                "Weight logged",
                null,
                weight.getWeightVal(),
                weight.getWeightTimestamp()
            ));
        }

        // Fetch calories
        List<Calories> caloriesList = caloriesRepository.findTop3ByUserIdOrderByCaloriesTimestampDesc(userId);
        for (Calories calories : caloriesList) {
            activities.add(new RecentActivity(
                "Meal logged",
                calories.getFoodName(),
                calories.getCalories(),
                calories.getCaloriesTimestamp()
            ));
        }

        // Sort by timestamp and return the most recent 3 entries
        return activities.stream()
            .sorted(Comparator.comparing(RecentActivity::getTimestamp).reversed())
            .limit(3)
            .collect(Collectors.toList());
    }

    // Inner class to represent recent activity
    public static class RecentActivity {
        private String type;
        private String name;
        private Integer value;
        private Timestamp timestamp;

        public RecentActivity(String type, String name, Integer value, Timestamp timestamp) {
            this.type = type;
            this.name = name;
            this.value = value;
            this.timestamp = timestamp;
        }

        public String getType() {
            return type;
        }

        public String getName() {
            return name;
        }

        public Integer getValue() {
            return value;
        }

        public Timestamp getTimestamp() {
            return timestamp;
        }
    }
}