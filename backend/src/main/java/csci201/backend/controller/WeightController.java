package csci201.backend.controller;

import csci201.backend.entity.Weight;
import csci201.backend.repository.WeightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/weight")
public class WeightController {

    @Autowired
    private WeightRepository weightRepository;

    @PostMapping
    public ResponseEntity<Weight> addWeightEntry(@RequestBody Map<String, Object> payload) {

        int userId = Integer.parseInt(payload.get("userId").toString());
        int weightValue = Integer.parseInt(payload.get("weightVal").toString());

        Weight weightEntry = new Weight();
        weightEntry.setUserId(userId);
        weightEntry.setWeightVal(weightValue);

        Weight savedEntry = weightRepository.save(weightEntry);
        return ResponseEntity.ok(savedEntry);
    }

    @GetMapping
    public List<Weight> getWeightsByUserId(@RequestParam("userId") int userId) {
        return weightRepository.findByUserId(userId);
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
    public ResponseEntity<Weight> editWeightEntry(
        @PathVariable int id, 
        @RequestBody Map<String, Object> payload
    ) {
        return weightRepository.findById(id).map(existingEntry -> {
            if (payload.containsKey("weightVal")) {
                existingEntry.setWeightVal(Integer.parseInt(payload.get("weightVal").toString()));
            }

            // Save updated entry
            Weight updatedEntry = weightRepository.save(existingEntry);
            return ResponseEntity.ok(updatedEntry);
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
