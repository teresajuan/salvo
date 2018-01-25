package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SalvoController {
    @Autowired
    private GameRepository repoGames;
    @Autowired
    private PlayerRepository repoPlayers;
//    public List<Game> getAll() {
//        return repo.findAll();
//    }

    @RequestMapping("/games")
    public List<Game> gamesList() {
        return repoGames.findAll();
    }
    @RequestMapping("/players")
    public List<Player> playersList() {
        return repoPlayers.findAll();
    }


}
