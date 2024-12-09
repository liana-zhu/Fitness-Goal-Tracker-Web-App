package csci201.backend.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "weight")
public class Weight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int weightId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "weight_timestamp", insertable = false, updatable = false)
    private Timestamp weightTimestamp;

    private int weightVal;

    // Getters and Setters
    public int getWeightId() {
        return weightId;
    }

    public void setWeightId(int weightId) {
        this.weightId = weightId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Timestamp getWeightTimestamp() {
        return weightTimestamp;
    }

    public void setWeightTimestamp(Timestamp weightTimestamp) {
        this.weightTimestamp = weightTimestamp;
    }

    public int getWeightVal() {
        return weightVal;
    }

    public void setWeightVal(int weightVal) {
        this.weightVal = weightVal;
    }
}
