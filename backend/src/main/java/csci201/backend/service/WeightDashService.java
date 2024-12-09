package csci201.backend.service;

import csci201.backend.entity.Weight;
import csci201.backend.repository.WeightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class WeightDashService {

    @Autowired
    private WeightRepository weightRepository;

    public Map<LocalDate, Integer> getWeightTrendForLast7Days(int userId) {
        LocalDate today = LocalDate.now();
        LocalDate sevenDaysAgo = today.minusDays(6);

        // Get all weight entries for the user
        List<Weight> weights = weightRepository.findByUserUserIdAndWeightTimestampBetween(
                userId,
                Timestamp.valueOf(sevenDaysAgo.atStartOfDay()),
                Timestamp.valueOf(today.plusDays(1).atStartOfDay())
        );

        // Get the last entry before the 7-day period
        Weight lastEntryBeforePeriod = weightRepository.findTopByUserUserIdAndWeightTimestampLessThanOrderByWeightTimestampDesc(
                userId,
                Timestamp.valueOf(sevenDaysAgo.atStartOfDay())
        );

        // Initialize the weight trend map
        Map<LocalDate, Integer> weightTrend = new LinkedHashMap<>();
        for (int i = 0; i < 7; i++) {
            weightTrend.put(sevenDaysAgo.plusDays(i), null);
        }

        // Populate the trend map with the last weight entry for each day
        Weight lastWeight = lastEntryBeforePeriod; // Start with the weight before the 7-day period
        for (Weight weight : weights) {
            LocalDate weightDate = weight.getWeightTimestamp().toLocalDateTime().toLocalDate();
            weightTrend.put(weightDate, weight.getWeightVal());
            lastWeight = weight; // Update the last known weight
        }

        // Fill in missing days with the last known weight
        Integer lastKnownWeight = (lastWeight != null) ? lastWeight.getWeightVal() : null;
        for (Map.Entry<LocalDate, Integer> entry : weightTrend.entrySet()) {
            if (entry.getValue() == null) {
                entry.setValue(lastKnownWeight);
            } else {
                lastKnownWeight = entry.getValue();
            }
        }

        return weightTrend;
    }
}
