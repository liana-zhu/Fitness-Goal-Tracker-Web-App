package csci201.backend.controller;

import csci201.backend.service.CaloriesDashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/dash/calories")
public class CaloriesDashController {

    @Autowired
    private CaloriesDashService caloriesDashService;

    @GetMapping
    public ResponseEntity<Map<LocalDate, Integer>> getWeeklyCaloriesSummary(@RequestParam int userId) {
        Map<LocalDate, Integer> weeklyCalories = caloriesDashService.getDailyCaloriesForPastWeek(userId);
        if (weeklyCalories.isEmpty()) {
            // Return an empty map if no data exists
            return ResponseEntity.ok(Collections.emptyMap());
        }
        return ResponseEntity.ok(weeklyCalories);
    }
}
