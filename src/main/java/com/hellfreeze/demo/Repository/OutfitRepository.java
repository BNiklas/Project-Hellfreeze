package com.hellfreeze.demo.Repository;

import com.hellfreeze.demo.Domain.Outfit;
import org.springframework.data.repository.CrudRepository;

public interface OutfitRepository extends CrudRepository<Outfit,Long> {
}
