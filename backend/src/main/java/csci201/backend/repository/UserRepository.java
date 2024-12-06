package csci201.backend.repository;

import csci201.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Custom query to find a user by either username or email
    Optional<User> findByUsernameOrUserEmail(String userInput, String userInputDuplicate);

    // Check if a user exists by username
    Optional<User> findByUsername(String username);

    // Check if a user exists by email
    Optional<User> findByUserEmail(String userEmail);
}