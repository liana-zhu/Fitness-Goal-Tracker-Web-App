package csci201.backend.controller;

import csci201.backend.entity.Workout;
import csci201.backend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/workout")
public class WorkoutController {

    @Autowired
    private WorkoutRepository workoutRepository;

    @PostMapping
    public ResponseEntity<Workout> addWorkoutEntry(@RequestBody Map<String, Object> payload) {
        System.out.println("Received payload: " + payload);
        int userId = Integer.parseInt(payload.get("userId").toString());
        String workoutType = payload.get("type").toString();
        String workoutName = payload.get("name").toString();
        Integer numSets = payload.get("sets").toString() != "" ? Integer.parseInt(payload.get("sets").toString()) : null;
        int duration = Integer.parseInt(payload.get("duration").toString());

        Workout workout = new Workout();
        workout.setUserId(userId);
        workout.setWorkoutTimestamp(LocalDateTime.now());
        workout.setWorkoutType(Workout.WorkoutType.valueOf(workoutType));
        workout.setWorkoutName(workoutName);
        workout.setNumSets(numSets);
        workout.setDuration(duration);

        Workout savedWorkout = workoutRepository.save(workout);
        return ResponseEntity.ok(savedWorkout);
    }

    @GetMapping
    public List<Workout> getWorkoutsByUserId(@RequestParam("userId") int userId) {
        return workoutRepository.findByUserId(userId);
    }

    @GetMapping("/by-date")
    public List<Workout> getWorkoutsByDate(
        @RequestParam("userId") int userId,
        @RequestParam("date") String date
    ) {
        LocalDate selectedDate = LocalDate.parse(date);
        return workoutRepository.findByUserIdAndDate(userId, selectedDate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Workout> editWorkoutEntry(
        @PathVariable int id,
        @RequestBody Map<String, Object> payload
    ) {
        return workoutRepository.findById(id).map(existingWorkout -> {
            if (payload.containsKey("type")) {
                existingWorkout.setWorkoutType(Workout.WorkoutType.valueOf(payload.get("type").toString()));
            }
            if (payload.containsKey("name")) {
                existingWorkout.setWorkoutName(payload.get("name").toString());
            }
            if (payload.containsKey("sets")) {
                existingWorkout.setNumSets(
                    payload.get("sets") != null ? Integer.parseInt(payload.get("sets").toString()) : null
                );
            }
            if (payload.containsKey("duration")) {
                existingWorkout.setDuration(Integer.parseInt(payload.get("duration").toString()));
            }

            Workout updatedWorkout = workoutRepository.save(existingWorkout);
            return ResponseEntity.ok(updatedWorkout);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutEntry(@PathVariable int id) {
        if (workoutRepository.existsById(id)) {
            workoutRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
