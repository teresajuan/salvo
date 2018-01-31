package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping
public class SalvoController {
    @Autowired
    private GameRepository repoGames;


    @RequestMapping("api/games")
    public ArrayList<Map<String, Object>> gamesList() {

        ArrayList<Map<String, Object>> gameList = new ArrayList<>();
        List<Game> listGames = repoGames.findAll();

        for (int j=0; j<listGames.size(); j++) {

            Map<String, Object> eachGame = new HashMap<>();

            eachGame.put("id", listGames.get(j).getId());
            eachGame.put("created", listGames.get(j).getCreationDate());
            eachGame.put("gamePlayers", listGames.get(j).getGamePlayers()
                                                        .stream()
                                                        .map(gp -> makeGamePlayerDTO(gp) )
                                                        .collect(Collectors.toList()));

            gameList.add(eachGame);
        }
        return gameList;
    }

    public Map<String, Object> makeGamePlayerDTO(GamePlayer gamePlayer){
        Map<String, Object> dto = new HashMap<>();

        dto.put("id", gamePlayer.getId());
        dto.put("player", makePlayerDTO(gamePlayer.getPlayers()));

        return dto;
    }

    public Map<String, Object> makePlayerDTO(Player player){
        Map<String, Object> dto = new HashMap<>();

        dto.put("id", player.getId());
        dto.put("email", player.getPlayer());

        return dto;
    }

    @Autowired
    private GamePlayerRepository repoGamePlayer;

    @RequestMapping("api/game_view/{player_Id}")
    public List<Map <String, Object>> gameView (@PathVariable Long player_Id) {

        ArrayList<Map<String, Object>> gameView = new ArrayList<Map<String, Object>>();
        List<GamePlayer> listGamePlayers = repoGamePlayer.findAll();

        for (int i = 0; i<listGamePlayers.size(); i++){
            Map<String, Object> eachGameView = new HashMap<>();
            if (listGamePlayers.get(i).getPlayers().getId() == player_Id) {

                eachGameView.put("id", listGamePlayers.get(i).getGames().getId());
                eachGameView.put("creation", listGamePlayers.get(i).getGames().getCreationDate());
                eachGameView.put("gamePlayer", listGamePlayers.get(i).getGames().getGamePlayers().stream()
                                                                                                .map(gamePlayer -> makeGamePlayerDTO(gamePlayer))
                                                                                                .collect(Collectors.toList()));

                gameView.add(eachGameView);
            }
        }

        return gameView;
    }

}
