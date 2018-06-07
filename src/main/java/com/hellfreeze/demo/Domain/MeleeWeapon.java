package com.hellfreeze.demo.Domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MeleeWeapon {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long meleeWeaponID;
    private String meleeWeaponName;
    private int meleeWeaponDamage;
    private String meleeWeaponAbility;
    private int meleeWeaponPrice;

    public MeleeWeapon() {
    }

    public MeleeWeapon(Long meleeWeaponID){
        this.meleeWeaponID = meleeWeaponID;
    }

    public MeleeWeapon(String meleeWeaponName, int meleeWeaponDamage, String meleeWeaponAbility, int meleeWeaponPrice) {
        this.meleeWeaponName = meleeWeaponName;
        this.meleeWeaponDamage = meleeWeaponDamage;
        this.meleeWeaponAbility = meleeWeaponAbility;
        this.meleeWeaponPrice = meleeWeaponPrice;
    }

    public Long getMeleeWeaponID() {
        return meleeWeaponID;
    }


    public String getMeleeWeaponName() {
        return meleeWeaponName;
    }

    public void setMeleeWeaponName(String meleeWeaponName) {
        this.meleeWeaponName = meleeWeaponName;
    }

    public int getMeleeWeaponDamage() {
        return meleeWeaponDamage;
    }

    public void setMeleeWeaponDamage(int meleeWeaponDamage) {
        this.meleeWeaponDamage = meleeWeaponDamage;
    }

    public String getMeleeWeaponAbility() {
        return meleeWeaponAbility;
    }

    public void setMeleeWeaponAbility(String meleeWeaponAbility) {
        this.meleeWeaponAbility = meleeWeaponAbility;
    }

    public int getMeleeWeaponPrice() {
        return meleeWeaponPrice;
    }

    public void setMeleeWeaponPrice(int meleeWeaponPrice) {
        this.meleeWeaponPrice = meleeWeaponPrice;
    }
}
