package com.hellfreeze.demo.Repository;

import com.hellfreeze.demo.Domain.RangedWeapon;
import org.springframework.data.repository.CrudRepository;

public interface RangedWeaponRepository extends CrudRepository<RangedWeapon,Long> {
}
