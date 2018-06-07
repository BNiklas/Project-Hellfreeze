package com.hellfreeze.demo.Repository;

import com.hellfreeze.demo.Domain.GameMap;
import org.springframework.data.repository.CrudRepository;

public interface GameMapRepository extends CrudRepository<GameMap,Long> {
}
