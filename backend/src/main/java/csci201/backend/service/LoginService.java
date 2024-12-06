package csci201.backend.service;

import csci201.backend.entity.User;
import csci201.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    public int authenticateUser(String userInput, String password) {
        // Search for the user by username or email
        Optional<User> userOpt = userRepository.findByUsernameOrUserEmail(userInput, userInput);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Check if the provided password matches the user's stored password
            if (user.getUserPassword().equals(password)) {
                return user.getUserId(); // Return userId if authentication is successful
            } else {
                throw new IllegalArgumentException("Invalid password.");
            }
        } else {
            throw new IllegalArgumentException("No user found with the provided username/email");
        }
    }
}
