package com.hellfreeze.demo.Domain;

import javax.persistence.*;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long playerID;
    private Long score;
    private int health;
    private int coins;
    private String outfit;

    @ManyToOne
    private GameMap gameMap;

    public Player() {
    }

    public Player(Long score, int health, int coins, String outfit, GameMap gameMap) {
        this.score = score;
        this.health = health;
        this.coins = coins;
        this.outfit = outfit;
        this.gameMap = gameMap;
    }

    public Long getPlayerID() {
        return playerID;
    }


    public Long getScore() {
        return score;
    }

    public void setScore(Long score) {
        this.score = score;
    }

    public int getHealth() {
        return health;
    }

    public void setHealth(int health) {
        this.health = health;
    }

    public int getCoins() {
        return coins;
    }

    public void setCoins(int coins) {
        this.coins = coins;
    }

    public String getOutfit() {
        return outfit;
    }

    public void setOutfit(String outfit) {
        this.outfit = outfit;
    }

    public GameMap getGameMap() {
        return gameMap;
    }

    public void setGameMap(GameMap gameMap) {
        this.gameMap = gameMap;
    }
}
