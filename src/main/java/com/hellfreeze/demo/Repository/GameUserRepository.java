package com.hellfreeze.demo.Repository;

import com.hellfreeze.demo.Domain.GameUser;
import org.springframework.data.repository.CrudRepository;

public interface GameUserRepository extends CrudRepository<GameUser,Long> {
    GameUser findByGameUserName(String gameUserName);
    GameUser findByEmail(String email);
}
