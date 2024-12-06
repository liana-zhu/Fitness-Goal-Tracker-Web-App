package csci201.backend.controller;

import csci201.backend.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/register")
public class RegisterController {

    @Autowired
    private RegisterService registerService;

    @PostMapping
    public ResponseEntity<Object> register(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String password) {
        try {
            // Call the service to register the user
            String message = registerService.registerUser(username, email, password);
            return ResponseEntity.ok(message); // Return success message
        } catch (IllegalArgumentException e) {
            // Return error message for validation failures
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

