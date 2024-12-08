package csci201.backend.repository;

import csci201.backend.entity.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;

@Repository
public interface WeightRepository extends JpaRepository<Weight, Integer> {

}
