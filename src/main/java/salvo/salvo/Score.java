package salvo.salvo;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Score {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private Double score;
    private Date finishDate;

    @ManyToOne
    @JoinColumn(name="player_id")
    private Player player;

    @ManyToOne
    @JoinColumn(name="game_id")
    private Game game;


    public Score() {}

    public Score(Double score, Date finishDate) {
        this.score = score;
        this.finishDate = finishDate;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public Player getPlayers() {
        return player;
    }

    public void setPlayers(Player player) {
        this.player = player;
    }

    public Game getGames() {
        return game;
    }

    public void setGames(Game game) {
        this.game = game;
    }
}
