package csci201.backend.controller;

import csci201.backend.entity.Calories;
import csci201.backend.entity.User;

import csci201.backend.repository.CaloriesRepository;
import csci201.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/calories")
public class CaloriesController {

    @Autowired
    private CaloriesRepository caloriesRepository;


    @PostMapping
    public ResponseEntity<Calories> addCalorieEntry(@RequestBody Map<String, Object> payload) {
        int userId = Integer.parseInt(payload.get("userId").toString());
        int calories = Integer.parseInt(payload.get("calories").toString());
        int protein = Integer.parseInt(payload.get("protein").toString());
        int carbs = Integer.parseInt(payload.get("carbs").toString());
        int fat = Integer.parseInt(payload.get("fat").toString());
        Calories calorieEntry = new Calories();
        calorieEntry.setUserId(userId);
        calorieEntry.setFoodName((String) payload.get("foodName"));
        calorieEntry.setCalories((int) calories);
        calorieEntry.setProtein((int) protein);
        calorieEntry.setCarbs((int) carbs);
        calorieEntry.setFat((int)fat);

        Calories savedEntry = caloriesRepository.save(calorieEntry);
        return ResponseEntity.ok(savedEntry);
    }
    @GetMapping
    public List<Calories> getCaloriesByUserId(@RequestParam("userId") int userId) {
        return caloriesRepository.findByUserId(userId);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalorieEntry(@PathVariable int id) {
        if (caloriesRepository.existsById(id)) {
            caloriesRepository.deleteById(id);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }
    @GetMapping("/by-date")
    
public List<Calories> getCaloriesByDate(
    @RequestParam("userId") int userId,
    @RequestParam("date") String date
) {
    LocalDate selectedDate = LocalDate.parse(date);
    return caloriesRepository.findByUserIdAndDate(userId, selectedDate);
}

    @PutMapping("/{id}")
    public ResponseEntity<Calories> editCalorieEntry(
        @PathVariable int id, 
        @RequestBody Map<String, Object> payload
    ) {
        return caloriesRepository.findById(id).map(existingEntry -> {
            if (payload.containsKey("foodName")) {
                existingEntry.setFoodName((String) payload.get("foodName"));
            }
            if (payload.containsKey("calories")) {
                existingEntry.setCalories(Integer.parseInt(payload.get("calories").toString()));
            }
            if (payload.containsKey("protein")) {
                existingEntry.setProtein(Integer.parseInt(payload.get("protein").toString()));
            }
            if (payload.containsKey("carbs")) {
                existingEntry.setCarbs(Integer.parseInt(payload.get("carbs").toString()));
            }
            if (payload.containsKey("fat")) {
                existingEntry.setFat(Integer.parseInt(payload.get("fat").toString()));
            }

            // Save updated entry
            Calories updatedEntry = caloriesRepository.save(existingEntry);
            return ResponseEntity.ok(updatedEntry);
        }).orElse(ResponseEntity.notFound().build());
    }
}
