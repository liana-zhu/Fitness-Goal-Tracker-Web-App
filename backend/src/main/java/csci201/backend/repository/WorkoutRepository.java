package csci201.backend.repository;

import csci201.backend.entity.Workout;
import csci201.backend.entity.Workout.WorkoutType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {

    // Count the number of workouts for a user within a specific time range
    long countByUserIdAndWorkoutTimestampBetween(int userId, LocalDateTime start, LocalDateTime end);

    List<Workout> findTop3ByUserIdOrderByWorkoutTimestampDesc(int userId);

    List<Workout> findByUserId(int userId);

    @Query("SELECT w FROM Workout w WHERE w.userId = :userId AND DATE(w.workoutTimestamp) = :date")
    List<Workout> findByUserIdAndDate(@Param("userId") int userId, @Param("date") LocalDate date);
}
