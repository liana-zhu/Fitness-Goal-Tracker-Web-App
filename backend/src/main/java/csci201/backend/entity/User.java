package csci201.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id") // Match database column name
    private int userID;

    @Column(name = "username", nullable = false, length = 20, unique = true)
    private String username;

    @Column(name = "user_password", nullable = false, length = 20) // Match database column name
    private String userPassword;

    @Column(name = "user_email", nullable = false, length = 20, unique = true) // Match database column name
    private String userEmail;

    // Getters and Setters
    public int getUserId() {
        return userID;
    }

    public void setUserId(int userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
