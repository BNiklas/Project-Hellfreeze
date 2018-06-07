package com.hellfreeze.demo.Repository;

import com.hellfreeze.demo.Domain.MeleeWeapon;
import org.springframework.data.repository.CrudRepository;

public interface MeleeWeaponRepository extends CrudRepository<MeleeWeapon,Long> {
}
