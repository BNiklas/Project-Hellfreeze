package com.hellfreeze.demo.Repository;

import com.hellfreeze.demo.Domain.Inventory;
import com.hellfreeze.demo.Domain.Player;
import org.springframework.data.repository.CrudRepository;

public interface InventoryRepository extends CrudRepository<Inventory,Long> {

    Inventory getInventoryByPlayer(Player player);
}
