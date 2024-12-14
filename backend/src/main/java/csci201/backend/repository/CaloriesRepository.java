package csci201.backend.repository;

import csci201.backend.entity.Calories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface CaloriesRepository extends JpaRepository<Calories, Integer> {

    @Query("SELECT CAST(c.caloriesTimestamp AS date) as date, SUM(c.calories) as totalCalories " +
    "FROM Calories c " +
    "WHERE c.userId = :userId " +
    "AND c.caloriesTimestamp BETWEEN :start AND :end " +
    "GROUP BY CAST(c.caloriesTimestamp AS date) " +
    "ORDER BY CAST(c.caloriesTimestamp AS date)")
List<Object[]> findCaloriesSumByUserIdAndDateRange(
    @Param("userId") int userId,
    @Param("start") Timestamp start,
    @Param("end") Timestamp end
);

    List<Calories> findTop3ByUserIdOrderByCaloriesTimestampDesc(int userId);

    List<Calories> findByUserId(int userId);
    @Query("SELECT c FROM Calories c WHERE c.userId = :userId AND DATE(c.caloriesTimestamp) = :date")
    List<Calories> findByUserIdAndDate(@Param("userId") int userId, @Param("date") LocalDate date);
}
