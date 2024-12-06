package csci201.backend.controller;

import csci201.backend.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/login")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<Object> login(@RequestParam String userInput, @RequestParam String password) {
        try {
            // Authenticate user and return their userId
            int userId = loginService.authenticateUser(userInput, password);
            return ResponseEntity.ok(userId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage()); // 400 Bad Request for invalid credentials
        }
    }
}
