package csci201.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "workout")
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workout_id")
    private int workoutId;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "workout_timestamp", nullable = false)
    private LocalDateTime workoutTimestamp;

    @Enumerated(EnumType.STRING)
    @Column(name = "workout_type", nullable = false)
    private WorkoutType workoutType;

    @Column(name = "workout_name", nullable = false, length = 100)
    private String workoutName;

    @Column(name = "num_sets")
    private Integer numSets;

    @Column(name = "duration", nullable = false)
    private int duration;

    // Getters and Setters
    public int getWorkoutId() {
        return workoutId;
    }

    public void setWorkoutId(int workoutId) {
        this.workoutId = workoutId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public LocalDateTime getWorkoutTimestamp() {
        return workoutTimestamp;
    }

    public void setWorkoutTimestamp(LocalDateTime workoutTimestamp) {
        this.workoutTimestamp = workoutTimestamp;
    }

    public WorkoutType getWorkoutType() {
        return workoutType;
    }

    public void setWorkoutType(WorkoutType workoutType) {
        this.workoutType = workoutType;
    }

    public String getWorkoutName() {
        return workoutName;
    }

    public void setWorkoutName(String workoutName) {
        this.workoutName = workoutName;
    }

    public Integer getNumSets() {
        return numSets;
    }

    public void setNumSets(Integer numSets) {
        this.numSets = numSets;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    // Enum for workout type
    public enum WorkoutType {
        weights,
        cardio
    }
}
