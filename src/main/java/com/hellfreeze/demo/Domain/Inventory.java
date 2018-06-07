package com.hellfreeze.demo.Domain;

import javax.persistence.*;

@Entity
public class Inventory {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long inventoryID;
    private int healthPotion;

    @OneToOne
    private Player player;
    @ManyToOne
    private MeleeWeapon meleeWeapon;
    @ManyToOne
    private RangedWeapon rangedWeapon;

    public Inventory(int healthPotion, Player player, MeleeWeapon meleeWeapon, RangedWeapon rangedWeapon) {
        this.healthPotion = healthPotion;
        this.player = player;
        this.meleeWeapon = meleeWeapon;
        this.rangedWeapon = rangedWeapon;
    }

    public Inventory() {
    }

    public Long getInventoryID() {
        return inventoryID;
    }

    public int getHealthPotion() {
        return healthPotion;
    }

    public void setHealthPotion(int healthPotion) {
        this.healthPotion = healthPotion;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public MeleeWeapon getMeleeWeapon() {
        return meleeWeapon;
    }

    public void setMeleeWeapon(MeleeWeapon meleeWeapon) {
        this.meleeWeapon = meleeWeapon;
    }

    public RangedWeapon getRangedWeapon() {
        return rangedWeapon;
    }

    public void setRangedWeapon(RangedWeapon rangedWeapon) {
        this.rangedWeapon = rangedWeapon;
    }
}
