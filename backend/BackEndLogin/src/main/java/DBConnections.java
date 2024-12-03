
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnections {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/FitnessGoalTrackerWebApp";
    private static final String USER = "root"; // Replace with your MySQL username
    private static final String PASSWORD = "Tangrui2004!"; // Replace with your MySQL password

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, USER, PASSWORD);
    }
}

