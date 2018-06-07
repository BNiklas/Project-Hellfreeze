package com.hellfreeze.demo.Domain;

import javax.persistence.*;

@Entity
public class Highscore {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long highscoreID;
    private Long totalScore;
    private String gameUserName;

    public Highscore() {
    }

    public Highscore(Long totalScore, String gameUserName) {
        this.totalScore = totalScore;
        this.gameUserName = gameUserName;
    }

    public Long getHighscoreID() {
        return highscoreID;
    }

    public String getGameUserName() {
        return gameUserName;
    }

    public void setGameUserName(String gameUserName) {
        this.gameUserName = gameUserName;
    }

    public Long getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Long totalScore) {
        this.totalScore = totalScore;
    }

}
