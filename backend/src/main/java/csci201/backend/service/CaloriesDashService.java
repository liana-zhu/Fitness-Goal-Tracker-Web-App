package csci201.backend.service;

import csci201.backend.repository.CaloriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CaloriesDashService {

    @Autowired
    private CaloriesRepository caloriesRepository;

    public Map<LocalDate, Integer> getDailyCaloriesForPastWeek(int userId) {
        // Get the start and end timestamps for the past week
        LocalDateTime endOfToday = LocalDate.now().atStartOfDay().plusDays(1);
        LocalDateTime startOfWeek = endOfToday.minusDays(7);

        Timestamp startTimestamp = Timestamp.valueOf(startOfWeek);
        Timestamp endTimestamp = Timestamp.valueOf(endOfToday);

        // Fetch all calorie entries for the user in the past week
        List<Object[]> results = caloriesRepository.findCaloriesSumByUserIdAndDateRange(userId, startTimestamp, endTimestamp);

        // Map results to a Map<LocalDate, Integer>
        return results.stream()
                .collect(Collectors.toMap(
                        result -> ((Timestamp) result[0]).toLocalDateTime().toLocalDate(), // Convert Timestamp to LocalDate
                        result -> ((Number) result[1]).intValue() // Sum of calories
                ));
    }
}
