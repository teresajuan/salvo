package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class SalvoController {
    @Autowired
    private GameRepository repoGames;
    @Autowired
    private PlayerRepository repoPlayers;

    @RequestMapping("api/games")
    public Map<String, Object> playerLogged() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        List<Player> playerLog = repoPlayers.findByUserName(name);

        Map<String, Object> playerLogged = new HashMap<>();

        if (isGuest(auth) == true){
            playerLogged.put("player", "null");
            playerLogged.put("games", gameList());
        } else {

            playerLogged.put("player", playerLog.stream()
                                                .map(player -> makeAuthenticationDTO(player))
                                                .collect(Collectors.toList()));
            playerLogged.put("games", gameList());
        }

        return playerLogged;

    }

    public Map<String, Object> makeAuthenticationDTO(Player player) {
        Map<String, Object> dto = new HashMap<>();

        dto.put("id", player.getId());
        dto.put("name", player.getUserName());

        return dto;
    }

    private boolean isGuest(Authentication authentication) {
        return authentication == null || authentication instanceof AnonymousAuthenticationToken;
    }

    public ArrayList<Map<String, Object>> gameList() {

        ArrayList<Map<String, Object>> gameList = new ArrayList<>();
        List<Game> listGames = repoGames.findAll();

        for (int j = 0; j < listGames.size(); j++) {

            Map<String, Object> eachGame = new HashMap<>();

            eachGame.put("id", listGames.get(j).getId());
            eachGame.put("created", listGames.get(j).getCreationDate());
            eachGame.put("gamePlayers", listGames.get(j).getGamePlayers()
                    .stream()
                    .map(gp -> makeGamePlayerDTO(gp))
                    .collect(Collectors.toList()));


            gameList.add(eachGame);
        }
        return gameList;
    }

    public Map<String, Object> makeGamePlayerDTO(GamePlayer gamePlayer) {
        Map<String, Object> dto = new HashMap<>();

        dto.put("id", gamePlayer.getId());
        dto.put("player", makePlayerDTO(gamePlayer));

        return dto;
    }

    public Map<String, Object> makePlayerDTO(GamePlayer gp) {
        Map<String, Object> dto = new HashMap<>();

        dto.put("id", gp.getPlayer().getId());
        dto.put("email", gp.getPlayer().getUserName());

        Score score = gp.getPlayer().getScore(gp.getGame());

        if (score != null) {
            dto.put("score", score.getPoints());
        }else {
            dto.put("score", "null");
        }
        return dto;
    }








    @Autowired
    private GamePlayerRepository repoGamePlayer;

    @RequestMapping("api/game_view/{gamePlayer_Id}")
    public Map<String, Object> gameView(@PathVariable Long gamePlayer_Id) {

        GamePlayer listGamePlayers = repoGamePlayer.findOne(gamePlayer_Id);

        Map<String, Object> eachGameView = new HashMap<>();

        eachGameView.put("id", listGamePlayers.getGame().getId());
        eachGameView.put("creation", listGamePlayers.getGame().getCreationDate());
        eachGameView.put("gamePlayer", listGamePlayers.getGame().getGamePlayers().stream()
                .map(gamePlayer -> makeGamePlayerDTO(gamePlayer))
                .collect(Collectors.toList()));
        eachGameView.put("ships", listGamePlayers.getShips().stream()
                .map(ship -> makeShipDTO(ship))
                .collect(Collectors.toList())
        );
        eachGameView.put("salvoes", listGamePlayers.getGame().getGamePlayers().stream()
                .map(gp -> makeSalvoPlayerDTO(gp))
                .collect(Collectors.toList()));

        return eachGameView;
    }

    public Map<String, Object> makeShipDTO(Ship ship) {
        Map<String, Object> dto = new HashMap<>();

        dto.put("type", ship.getShipType());
        dto.put("locations", ship.getShipLoc());
        return dto;
    }

    public Map<Long, Object> makeSalvoPlayerDTO(GamePlayer gamePlayer) {
        Map<Long, Object> dto = new HashMap<>();

        dto.put(gamePlayer.getPlayer().getId(), gamePlayer.getSalvos().stream().map(salvo -> makeSalvoDTO(salvo)).collect(Collectors.toList()));

        return dto;
    }

    public Map<Integer, Object> makeSalvoDTO(Salvo salvo) {
        Map<Integer, Object> dto = new HashMap<>();

        dto.put(salvo.getTurn(), salvo.getSalvoLocation());

        return dto;
    }

}
