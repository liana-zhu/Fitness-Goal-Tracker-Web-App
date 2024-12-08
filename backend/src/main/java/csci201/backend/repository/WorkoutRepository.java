package csci201.backend.repository;

import csci201.backend.entity.Workout;
import csci201.backend.entity.Workout.WorkoutType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {

}
