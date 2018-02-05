package salvo.salvo;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.*;

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

    @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER)
    Set<Ship> ships = new HashSet<>();

    @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER)
    Set<Salvo> salvoes = new HashSet<>();

    public GamePlayer() {}

    public GamePlayer(Player player, Game game, Date joinDate) {

        this.player = player;
        this.game = game;
        this.joinDate = joinDate;

    }

    public long getId() {
        return id;
    }

    public Player getPlayers() {
        return player;
    }

    public void setPlayers(Player player) {
        this.player= player;
    }

    @JsonIgnore
    public Game getGames() {
        return game;
    }
    public void setGames(Game game) {
        this.game = game;
    }

    @JsonIgnore
    public Date getJoinDates() {
        return joinDate;
    }

    public void setJoinDates(Date joinDate) {
        this.joinDate = joinDate;
    }

    public Set<Ship> getShips() {
        return ships;
    }
    public void addShips (Ship ship) {
        ship.setGamePlayer(this);
        ships.add(ship);
    }

    public Set<Salvo> getSalvoes() {
        return salvoes;
    }

    public void addSalvoes (Salvo salvo) {
        salvo.setGamePlayer(this);
        salvoes.add(salvo);
    }
}
