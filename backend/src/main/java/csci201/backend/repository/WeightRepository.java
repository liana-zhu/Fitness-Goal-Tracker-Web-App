package csci201.backend.repository;

import csci201.backend.entity.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Integer> {
     
    // Find all weight entries for a user within a specific time range
     List<Weight> findByUserUserIdAndWeightTimestampBetween(int userId, Timestamp start, Timestamp end);

     // Find the most recent weight entry before a specific timestamp
     Weight findTopByUserUserIdAndWeightTimestampLessThanOrderByWeightTimestampDesc(int userId, Timestamp before);

     List<Weight> findTop3ByUserUserIdOrderByWeightTimestampDesc(int userId);
}
