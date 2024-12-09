package csci201.backend.service;

import csci201.backend.entity.User;
import csci201.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserNameService {

    @Autowired
    private UserRepository userRepository;

    public String getUsernameByUserId(int userId) {
        return userRepository.findById(userId)
                .map(User::getUsername)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
    }
}
