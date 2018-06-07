package com.hellfreeze.demo.Repository;

import com.hellfreeze.demo.Domain.Player;
import org.springframework.data.repository.CrudRepository;

public interface PlayerRepository extends CrudRepository<Player,Long> {
}
