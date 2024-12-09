package csci201.backend.controller;

import csci201.backend.service.WorkoutDashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dash/workout")
public class WorkoutDashController {

    @Autowired
    private WorkoutDashService workoutDashService;

    @GetMapping
    public ResponseEntity<Long> getWorkoutsThisWeek(@RequestParam int userId) {
        long workoutCount = workoutDashService.getWorkoutsThisWeek(userId);
        return ResponseEntity.ok(workoutCount);
    }
}
