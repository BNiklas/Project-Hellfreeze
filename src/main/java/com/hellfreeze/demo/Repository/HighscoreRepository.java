package com.hellfreeze.demo.Repository;

import com.hellfreeze.demo.Domain.Highscore;
import org.springframework.data.repository.CrudRepository;

public interface HighscoreRepository extends CrudRepository<Highscore,Long> {
    Iterable<Highscore> findAllByOrderByTotalScoreDesc();
    Highscore findFirstByOrderByTotalScoreAsc();
}
