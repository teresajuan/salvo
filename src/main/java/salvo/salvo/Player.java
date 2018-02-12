package salvo.salvo;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long player_id;
    private String userName;

    @OneToMany(mappedBy="player", fetch=FetchType.EAGER)
    Set<GamePlayer> GamePlayers;

    @OneToMany(mappedBy="player", fetch=FetchType.EAGER)
    Set<Score> scores = new HashSet<>();


    public Player(){}

    public Player(String userName) {
        this.userName = userName;
    }
    public long getId() {
        return player_id;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
//    public void addGamePlayer(GamePlayer gamePlayer) {
//        gamePlayer.setUserName(this);
//        gamePlayers.add(gamePlayer);
//    }

    public Set<Score> getScores() {
        return scores;
    }

    public void addScore(Score score) {
        score.setPlayer(this);
        scores.add(score);
    }

    public Score getScore(Game game) {

        return scores.stream()
                        .filter(score -> score.getGame().getId() == game.getId())
                        .findFirst()
                        .orElse(null);

    }

    public String toString() {
        return player_id + " " + "refers to " + userName;
    }
}
