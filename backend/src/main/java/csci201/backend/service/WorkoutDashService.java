package csci201.backend.service;

import csci201.backend.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
public class WorkoutDashService {

    @Autowired
    private WorkoutRepository workoutRepository;

    public long getWorkoutsThisWeek(int userId) {
        // Calculate the start and end of the current week
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfWeek = now.with(java.time.DayOfWeek.MONDAY).withHour(0).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime endOfWeek = now.with(java.time.DayOfWeek.SUNDAY).withHour(23).withMinute(59).withSecond(59).withNano(0);

        Timestamp startTimestamp = Timestamp.valueOf(startOfWeek);
        Timestamp endTimestamp = Timestamp.valueOf(endOfWeek);

        // Query the repository for workouts in this time range
        return workoutRepository.countByUserUserIdAndWorkoutTimestampBetween(userId, startTimestamp, endTimestamp);
    }
}
