package csci201.backend.repository;

import csci201.backend.entity.Workout;
import csci201.backend.entity.Workout.WorkoutType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {

    // Count the number of workouts for a user within a specific time range
    long countByUserUserIdAndWorkoutTimestampBetween(int userId, Timestamp start, Timestamp end);

    List<Workout> findTop3ByUserUserIdOrderByWorkoutTimestampDesc(int userId);

    List<Weight> findByUserId(int userId);

    @Query("SELECT w FROM Weight w WHERE w.userId = :userId AND DATE(w.weightTimestamp) = :date")
    List<Weight> findByUserIdAndDate(@Param("userId") int userId, @Param("date") LocalDate date);
}
