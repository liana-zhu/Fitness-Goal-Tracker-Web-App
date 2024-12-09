package csci201.backend.controller;

import csci201.backend.service.DashHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dash/history")
public class DashHistoryController {

    @Autowired
    private DashHistoryService dashHistoryService;

    @GetMapping
    public ResponseEntity<List<DashHistoryService.RecentActivity>> getRecentActivities(@RequestParam int userId) {
        List<DashHistoryService.RecentActivity> recentActivities = dashHistoryService.getRecentActivities(userId);
        return ResponseEntity.ok(recentActivities);
    }
}
