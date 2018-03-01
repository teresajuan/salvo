package salvo.salvo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class SalvoController {

    @Autowired
    private  GameRepository repoGames;
    @Autowired
    private PlayerRepository repoPlayers;
    @Autowired
    private GamePlayerRepository repoGamePlayer;


    @RequestMapping(path="/api/games")
    public Map<String, Object> playerLogged(Authentication auth) {

        Map<String, Object> playerLogged = new HashMap<>();

        if (isGuest(auth) == true) {
            playerLogged.put("player", "null");
            playerLogged.put("games", gameList());
        } else {
            String name = auth.getName();
            Player playerLog = repoPlayers.findOneByUserName(name);

            playerLogged.put("player", makeAuthenticationDTO(playerLog));
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
        } else {
            dto.put("score", "null");
        }
        return dto;
    }

//    Función para crear nuevo juego

    @RequestMapping(path= "/api/games", method= RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> createNewGame (Authentication auth){

        if (isGuest(auth) == true) {
            return new ResponseEntity<>(makeMap("error", "You can't create games if you're not logged"), HttpStatus.UNAUTHORIZED);
        }

        String name = auth.getName();
        Player playerLog = repoPlayers.findOneByUserName(name);
        Game newGame = repoGames.save(new Game(new Date()));
        GamePlayer newGp = repoGamePlayer.save(new GamePlayer(playerLog, newGame, new Date()));

        return new ResponseEntity<>(makeMap("gpId", newGp.getId()), HttpStatus.CREATED);

    }

    //Función para que un jugador pueda unirse a un juego ya creado

    @RequestMapping(path="/api/game/{gameId}/players", method=RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> joinGame(Authentication auth, @PathVariable Long gameId) {

        if (isGuest(auth)) {
            return new ResponseEntity<>(makeMap("error", "You can't join to games if you're not logged"), HttpStatus.UNAUTHORIZED);
        }

        Game gameToJoin = repoGames.findOne(gameId);

        if(gameToJoin == null){
            return new ResponseEntity<>(makeMap("error", "This game doesn't exists"), HttpStatus.FORBIDDEN);
        }

        if(gameToJoin.getGamePlayers().size()>1){
            return new ResponseEntity<>(makeMap("error", "Game is full"), HttpStatus.FORBIDDEN);
        }

        String name = auth.getName();
        Player playerLog = repoPlayers.findOneByUserName(name);

        GamePlayer gpToJoin = repoGamePlayer.save(new GamePlayer(playerLog, gameToJoin, new Date()));

        return new ResponseEntity<>(makeMap("gpId", gpToJoin.getId()), HttpStatus.CREATED);

    }

    @RequestMapping("/api/game_view/{gamePlayer_Id}")
    public ResponseEntity<Map<String, Object>> gpGame(@PathVariable Long gamePlayer_Id,
                                                      Authentication auth) {

        String name = auth.getName();
        Player playerLog = repoPlayers.findOneByUserName(name);
        GamePlayer listGamePlayers = repoGamePlayer.findOne(gamePlayer_Id);

        if(playerLog.getUserName() != listGamePlayers.getPlayer().getUserName()) {
            return new ResponseEntity<>(makeMap("error", "this is not your game"), HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(gameView(gamePlayer_Id), HttpStatus.OK);
    }

//    @RequestMapping(path="/api/game_view/{gamePlayer_Id}", method = RequestMethod.GET)
    public Map<String, Object> gameView(Long gamePlayer_Id) {

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

    @RequestMapping(path = "/api/players", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> createUser(@RequestParam String username, @RequestParam String password) {
        if (username.isEmpty() || password.isEmpty()) {
            return new ResponseEntity<>(makeMap("error", "empty field"), HttpStatus.FORBIDDEN);
        }
        Player player = repoPlayers.findOneByUserName(username);
        if (player != null) {
            return new ResponseEntity<>(makeMap("error", "Name in use"), HttpStatus.FORBIDDEN);
        }
        player = repoPlayers.save(new Player(username, password));
        return new ResponseEntity<>(makeMap("id", player.getId()), HttpStatus.CREATED);

    }

    private Map<String, Object> makeMap(String key, Object value) {
        Map<String, Object> map = new HashMap<>();
        map.put(key, value);
        return map;
    }

}
