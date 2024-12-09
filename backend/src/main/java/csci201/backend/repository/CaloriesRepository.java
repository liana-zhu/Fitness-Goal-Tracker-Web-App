package csci201.backend.repository;

import csci201.backend.entity.Calories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface CaloriesRepository extends JpaRepository<Calories, Integer> {

    @Query("SELECT DATE(c.caloriesTimestamp) as date, SUM(c.calories) as totalCalories " +
           "FROM Calories c " +
           "WHERE c.user.userId = :userId AND c.caloriesTimestamp BETWEEN :start AND :end " +
           "GROUP BY DATE(c.caloriesTimestamp) " +
           "ORDER BY DATE(c.caloriesTimestamp)")
    List<Object[]> findCaloriesSumByUserIdAndDateRange(int userId, Timestamp start, Timestamp end);

    List<Calories> findTop3ByUserUserIdOrderByCaloriesTimestampDesc(int userId);

    List<Calories> findByUserId(int userId);
    @Query("SELECT c FROM Calories c WHERE c.userId = :userId AND DATE(c.caloriesTimestamp) = :date")
    List<Calories> findByUserIdAndDate(@Param("userId") int userId, @Param("date") LocalDate date);
}
