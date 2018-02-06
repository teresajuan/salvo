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

    @RequestMapping("api/game_view/{gamePlayer_Id}")
    public Map <String, Object> gameView (@PathVariable Long gamePlayer_Id) {

        GamePlayer listGamePlayers = repoGamePlayer.findOne(gamePlayer_Id);

        Map<String, Object> eachGameView = new HashMap<>();

        eachGameView.put("id", listGamePlayers.getGames().getId());
        eachGameView.put("creation", listGamePlayers.getGames().getCreationDate());
        eachGameView.put("gamePlayer", listGamePlayers.getGames().getGamePlayers().stream()
                .map(gamePlayer -> makeGamePlayerDTO(gamePlayer))
                .collect(Collectors.toList()));
        eachGameView.put("ships", listGamePlayers.getShips().stream()
                                                            .map(ship -> makeShipDTO(ship))
                                                            .collect(Collectors.toList())
        );
        eachGameView.put("salvoes", listGamePlayers.getGames().getGamePlayers().stream()
                                                                .map(gp-> makeSalvoPlayerDTO(gp))
                                                                .collect(Collectors.toList()));

        return eachGameView;
    }

    public Map<String, Object> makeShipDTO (Ship ship) {
        Map<String, Object> dto = new HashMap<>();

        dto.put("type", ship.getShipType());
        dto.put("locations", ship.getShipLoc());
        return dto;
    }

    public Map<Long, Object> makeSalvoPlayerDTO (GamePlayer gamePlayer) {
        Map<Long, Object> dto = new HashMap<>();

        dto.put(gamePlayer.getPlayers().getId(), gamePlayer.getSalvoes().stream().map(salvo -> makeSalvoDTO(salvo)).collect(Collectors.toList()));

        return dto;
    }
    
    public Map<Object, Object> makeSalvoDTO (Salvo salvo) {
        Map<Object, Object> dto = new HashMap<>();

        dto.put(salvo.getTurn(), salvo.getSalvoLocation());

        return dto;
    }

}
