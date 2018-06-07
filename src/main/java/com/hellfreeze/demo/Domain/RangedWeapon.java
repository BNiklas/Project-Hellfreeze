package com.hellfreeze.demo.Domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RangedWeapon {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long rangedWeaponID;
    private String rangedWeaponName;
    private int rangedWeaponDamage;
    private String rangedWeaponAbility;
    private int rangedWeaponPrice;

    public RangedWeapon() {
    }

    public RangedWeapon(String rangedWeaponName, int rangedWeaponDamage, String rangedWeaponAbility, int rangedWeaponPrice) {
        this.rangedWeaponName = rangedWeaponName;
        this.rangedWeaponDamage = rangedWeaponDamage;
        this.rangedWeaponAbility = rangedWeaponAbility;
        this.rangedWeaponPrice = rangedWeaponPrice;
    }

    public Long getRangedWeaponID() {
        return rangedWeaponID;
    }

    public String getRangedWeaponName() {
        return rangedWeaponName;
    }

    public void setRangedWeaponName(String rangedWeaponName) {
        this.rangedWeaponName = rangedWeaponName;
    }

    public int getRangedWeaponDamage() {
        return rangedWeaponDamage;
    }

    public void setRangedWeaponDamage(int rangedWeaponDamage) {
        this.rangedWeaponDamage = rangedWeaponDamage;
    }

    public String getRangedWeaponAbility() {
        return rangedWeaponAbility;
    }

    public void setRangedWeaponAbility(String rangedWeaponAbility) {
        this.rangedWeaponAbility = rangedWeaponAbility;
    }

    public int getRangedWeaponPrice() {
        return rangedWeaponPrice;
    }

    public void setRangedWeaponPrice(int rangedWeaponPrice) {
        this.rangedWeaponPrice = rangedWeaponPrice;
    }
}
