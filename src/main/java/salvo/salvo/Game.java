package salvo.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.swing.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Entity
public class Game {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long game_id;
    private Date creationDate;

    @JsonIgnore
    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    Set<GamePlayer> GamePlayers;

    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    Set<Score> scores = new HashSet<>();

    public Game() {}

    public Game(Date date) {
        this.creationDate = date;
    }

    public long getId() {
        return game_id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date date) {
        this.creationDate = date;
    }

    public Set<GamePlayer> getGamePlayers() {
        return GamePlayers;
    }

    public void addScores(Score score) {
        score.setGames(this);
        scores.add(score);
    }

    //    public void addGamePlayer(GamePlayer gamePlayer) {
//        gamePlayer.setGames(this);
//        GamePlayers.add(gamePlayer);
//    }

//    public String toString() {
//        return "" + creationDate ;
//    }

}
