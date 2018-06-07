package com.hellfreeze.demo.Domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GameMap {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long gameMapID;
    private String gameMapName;
    private int maxTime;
    private int gameMapScore;

    public GameMap() {
    }

    public GameMap(Long gameMapID) {
        this.gameMapID = gameMapID;
    }

    public GameMap(String gameMapName, int maxTime, int gameMapScore) {
        this.gameMapName = gameMapName;
        this.maxTime = maxTime;
        this.gameMapScore = gameMapScore;
    }

    public Long getGameMapID() {
        return gameMapID;
    }

    public String getGameMapName() {
        return gameMapName;
    }

    public void setGameMapName(String gameMapName) {
        this.gameMapName = gameMapName;
    }

    public int getMaxTime() {
        return maxTime;
    }

    public void setMaxTime(int maxTime) {
        this.maxTime = maxTime;
    }

    public int getGameMapScore() {
        return gameMapScore;
    }

    public void setGameMapScore(int gameMapScore) {
        this.gameMapScore = gameMapScore;
    }
}
