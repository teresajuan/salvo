package salvo.salvo;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
public class GamePlayer {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private Date joinDate;

    @ManyToOne
    @JoinColumn(name="player_id")
    private Player player;

    @ManyToOne
    @JoinColumn(name="game_id")
    private Game game;

    public GamePlayer() {}

    public GamePlayer(Player player, Game game, Date joinDate) {

        this.player = player;
        this.game = game;
        this.joinDate = joinDate;

    }
    public Player getPlayers() {
        return player;
    }

    public void setPlayers(Player player) {
        this.player = player;
    }

//    @JsonIgnore
    public Game getGames() {
        return game;
    }
    public void setGames(Game game) {
        this.game = game;
    }

    public Date getJoinDates() {
        return joinDate;
    }

    public void setJoinDates(Date joinDate) {
        this.joinDate = joinDate;
    }

}
