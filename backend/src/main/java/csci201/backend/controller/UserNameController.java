package csci201.backend.controller;

import csci201.backend.service.UserNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sidebar/username")
public class UserNameController {

    @Autowired
    private UserNameService userNameService;

    @GetMapping
    public ResponseEntity<String> getUsername(@RequestParam int userId) {
        try {
            String username = userNameService.getUsernameByUserId(userId);
            return ResponseEntity.ok(username);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
