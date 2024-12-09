package csci201.backend.controller;

import csci201.backend.service.WeightDashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/dash/weight")
public class WeightDashController {

    @Autowired
    private WeightDashService weightDashService;

    @GetMapping
    public ResponseEntity<Map<LocalDate, Integer>> getWeightTrend(@RequestParam int userId) {
        Map<LocalDate, Integer> weightTrend = weightDashService.getWeightTrendForLast7Days(userId);
        return ResponseEntity.ok(weightTrend);
    }
}
