package salvo.salvo;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.swing.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Set;


@Entity
public class Game {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long game_id;
    private Date creationDate;

    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    Set<GamePlayer> GamePlayers;

    public Game() {}

    public Game(Date date) {
        this.creationDate = date;
    }


    public long getId() {
        return game_id;
    }
    @JsonIgnore
    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date date) {
        this.creationDate = date;
    }

//    public void addGamePlayer(GamePlayer gamePlayer) {
//        gamePlayer.setGames(this);
//        GamePlayers.add(gamePlayer);
//    }

//    public String toString() {
//        return "" + creationDate ;
//    }

}