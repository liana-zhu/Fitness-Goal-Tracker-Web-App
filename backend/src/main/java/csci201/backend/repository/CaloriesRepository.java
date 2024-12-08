package csci201.backend.repository;

import csci201.backend.entity.Calories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;

@Repository
public interface CaloriesRepository extends JpaRepository<Calories, Integer> {

}
