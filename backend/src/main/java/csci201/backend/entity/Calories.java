package csci201.backend.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "calories")

public class Calories {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int caloriesId;

    @Column(name = "user_id")
    private int userId;

    @CreationTimestamp
    @Column(name = "calories_timestamp", insertable = false, updatable = false)
    private Timestamp caloriesTimestamp;

    private String foodName;

    private int calories;

    private int protein;

    private int carbs;

    private int fat;

    // Getters and Setters
    public int getCaloriesId() {
        return caloriesId;
    }

    public void setCaloriesId(int caloriesId) {
        this.caloriesId = caloriesId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Timestamp getCaloriesTimestamp() {
        return caloriesTimestamp;
    }

    /* 
    public void setCaloriesTimestamp(Timestamp caloriesTimestamp) {
        this.caloriesTimestamp = caloriesTimestamp;
    }*/

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public int getProtein() {
        return protein;
    }

    public void setProtein(int protein) {
        this.protein = protein;
    }

    public int getCarbs() {
        return carbs;
    }

    public void setCarbs(int carbs) {
        this.carbs = carbs;
    }

    public int getFat() {
        return fat;
    }

    public void setFat(int fat) {
        this.fat = fat;
    }
}
