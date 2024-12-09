package csci201.backend.repository;

import csci201.backend.entity.Workout;
import csci201.backend.entity.Workout.WorkoutType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {

    // Count the number of workouts for a user within a specific time range
    long countByUserUserIdAndWorkoutTimestampBetween(int userId, Timestamp start, Timestamp end);

    List<Workout> findTop3ByUserUserIdOrderByWorkoutTimestampDesc(int userId);
}
