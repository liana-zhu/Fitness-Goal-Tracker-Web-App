package csci201.backend.controller;

import csci201.backend.entity.Weight;
import csci201.backend.repository.WeightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/weight")
public class WeightController {

    @Autowired
    private WeightRepository weightRepository;

    @PostMapping
    public ResponseEntity<Map<String, Object>> addWeightEntry(@RequestBody Map<String, Object> payload) {

        int userId = Integer.parseInt(payload.get("userId").toString());
        int weightValue = Integer.parseInt(payload.get("weightVal").toString());

        Weight weightEntry = new Weight();
        weightEntry.setUserId(userId);
        weightEntry.setWeightVal(weightValue);
        weightEntry.setWeightTimestamp(Timestamp.valueOf(java.time.LocalDateTime.now()));

        Weight savedEntry = weightRepository.save(weightEntry);

        // Create a response map
        Map<String, Object> response = new HashMap<>();
        response.put("weightId", savedEntry.getWeightId());
        response.put("weightVal", savedEntry.getWeightVal());
        response.put("weightTimestamp", savedEntry.getWeightTimestamp().toLocalDateTime().toLocalDate().toString());
    
        return ResponseEntity.ok(response);
    }

    @GetMapping
public List<Map<String, Object>> getWeightsByUserId(@RequestParam("userId") int userId) {
    List<Weight> weights = weightRepository.findByUserId(userId);
    return weights.stream().map(weight -> {
        Map<String, Object> weightMap = new HashMap<>();
        weightMap.put("weightId", weight.getWeightId());
        weightMap.put("weightVal", weight.getWeightVal());
        weightMap.put("weightTimestamp", weight.getWeightTimestamp().toLocalDateTime().toLocalDate().toString()); // Convert to LocalDate
        return weightMap;
    }).collect(Collectors.toList());
}

    @GetMapping("/by-date")
    public List<Weight> getWeightsByDate(
        @RequestParam("userId") int userId,
        @RequestParam("date") String date
    ) {
        LocalDate selectedDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
        return weightRepository.findByUserIdAndDate(userId, selectedDate);
    }

    @PutMapping("/{id}")
public ResponseEntity<Map<String, Object>> editWeightEntry(
    @PathVariable int id, 
    @RequestBody Map<String, Object> payload
) {
    return weightRepository.findById(id).map(existingEntry -> {
        if (payload.containsKey("weightVal")) {
            existingEntry.setWeightVal(Integer.parseInt(payload.get("weightVal").toString()));
        }

        // Save updated entry
        Weight updatedEntry = weightRepository.save(existingEntry);

        // Create a response map similar to GET and POST
        Map<String, Object> response = new HashMap<>();
        response.put("weightId", updatedEntry.getWeightId());
        response.put("weightVal", updatedEntry.getWeightVal());
        response.put("weightTimestamp", updatedEntry.getWeightTimestamp().toLocalDateTime().toLocalDate().toString());
        
        return ResponseEntity.ok(response);
    }).orElse(ResponseEntity.notFound().build());
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeightEntry(@PathVariable int id) {
        if (weightRepository.existsById(id)) {
            weightRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
