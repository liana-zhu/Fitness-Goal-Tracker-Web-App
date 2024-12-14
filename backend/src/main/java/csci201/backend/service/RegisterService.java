package csci201.backend.service;

import csci201.backend.entity.User;
import csci201.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(String username, String email, String password, String confirmPassword) {
        // Check if passwords match
        if (!password.equals(confirmPassword)) {
            throw new IllegalArgumentException("Passwords do not match.");
        }

        // Check if the username is already taken
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username is already taken.");
        }

        // Check if the email is already taken
        if (userRepository.findByUserEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        // If both are available, create a new user and save to the database
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setUserEmail(email);
        newUser.setUserPassword(password);
        userRepository.save(newUser);

        return "User registered successfully!";
    }
}
