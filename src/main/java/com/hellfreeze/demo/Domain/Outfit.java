package com.hellfreeze.demo.Domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Outfit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long outfitID;
    private String outfitColor;
    private int outfitPrice;

    @ManyToMany(mappedBy = "outfits")
    private Set<GameUser> gameUsers = new HashSet<>();

    public Outfit() {
    }

    public Outfit(String outfitColor, int outfitPrice) {
        this.outfitColor = outfitColor;
        this.outfitPrice = outfitPrice;
    }

    public Long getOutfitID() {
        return outfitID;
    }

    public String getOutfitColor() {
        return outfitColor;
    }

    public void setOutfitColor(String outfitColor) {
        this.outfitColor = outfitColor;
    }

    public int getOutfitPrice() {
        return outfitPrice;
    }

    public void setOutfitPrice(int outfitPrice) {
        this.outfitPrice = outfitPrice;
    }

    public Set<GameUser> getGameUsers() {
        return gameUsers;
    }

    public void setGameUsers(Set<GameUser> gameUsers) {
        this.gameUsers = gameUsers;
    }
}
