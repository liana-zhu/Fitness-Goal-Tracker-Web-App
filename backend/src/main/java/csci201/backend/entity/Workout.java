package csci201.backend.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "workout")
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int workoutId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Timestamp workoutTimestamp;

    @Enumerated(EnumType.STRING)
    private WorkoutType workoutType;

    private String workoutName;

    private Integer numSets;

    private int duration;

    // Enum Declaration
    public enum WorkoutType {
        Weights,
        Cardio
    }

    // Getters and Setters
    public int getWorkoutId() {
        return workoutId;
    }

    public void setWorkoutId(int workoutId) {
        this.workoutId = workoutId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Timestamp getWorkoutTimestamp() {
        return workoutTimestamp;
    }

    public void setWorkoutTimestamp(Timestamp workoutTimestamp) {
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
}
