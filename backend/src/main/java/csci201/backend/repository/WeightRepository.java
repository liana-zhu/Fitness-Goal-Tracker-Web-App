package csci201.backend.repository;

import csci201.backend.entity.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.sql.Timestamp;
import java.util.List;
import java.time.LocalDate;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Integer> {
     
    // Find all weight entries for a user within a specific time range
     List<Weight> findByUserIdAndWeightTimestampBetween(int userId, Timestamp start, Timestamp end);

     // Find the most recent weight entry before a specific timestamp
     Weight findTopByUserIdAndWeightTimestampLessThanOrderByWeightTimestampDesc(int userId, Timestamp before);

     List<Weight> findTop3ByUserIdOrderByWeightTimestampDesc(int userId);
     List<Weight> findByUserId(int userId);
     
    @Query("SELECT w FROM Weight w WHERE w.userId = :userId AND DATE(w.weightTimestamp) = :date")
    List<Weight> findByUserIdAndDate(@Param("userId") int userId, @Param("date") LocalDate date);
     
}
