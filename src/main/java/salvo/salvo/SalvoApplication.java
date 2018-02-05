package salvo.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);

	}
	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository, GameRepository gameRepository, GamePlayerRepository gamePlayerRepository, ShipRepository shipRepository, SalvoRepository salvoRepository) {
		return (args) -> {
			//create players

			Player p1 = new Player("j.bauer@ctu.gov");
			Player p2 = new Player("c.obrian@ctu.gov");
			Player p3 = new Player("kim_bauer@gmail.com");
			Player p4 = new Player("t.almeida@ctu.gov");

			// save players

			playerRepository.save(p1);
			playerRepository.save(p2);
			playerRepository.save(p3);
			playerRepository.save(p4);

			//create dates

			Date d1 = new Date();
			Date d2 = Date.from(d1.toInstant().plusSeconds(3600));
			Date d3 = Date.from(d1.toInstant().plusSeconds(7200));

			//create games

			Game g1 = new Game(d1);
			Game g2 = new Game(d2);
			Game g3 = new Game(d3);
			Game g4 = new Game(d1);
			Game g5 = new Game(d1);
			Game g6 = new Game(d1);
			Game g7 = new Game(d1);
			Game g8 = new Game(d1);

			//save games

			gameRepository.save(g1);
			gameRepository.save(g2);
			gameRepository.save(g3);
			gameRepository.save(g4);
			gameRepository.save(g5);
			gameRepository.save(g6);
			gameRepository.save(g7);
			gameRepository.save(g8);

			//create join dates

			Date jd1 = new Date();

			//create gameplayers

			GamePlayer gp1 = new GamePlayer(p1, g1, jd1);
			GamePlayer gp2 = new GamePlayer(p2, g1, jd1);
			GamePlayer gp3 = new GamePlayer(p1, g2, jd1);
			GamePlayer gp4 = new GamePlayer(p2, g2, jd1);
			GamePlayer gp5 = new GamePlayer(p2, g3, jd1);
			GamePlayer gp6 = new GamePlayer(p4, g3, jd1);
			GamePlayer gp7 = new GamePlayer(p2, g4, jd1);
			GamePlayer gp8 = new GamePlayer(p1, g4, jd1);
			GamePlayer gp9 = new GamePlayer(p4, g5, jd1);
			GamePlayer gp10 = new GamePlayer(p3, g6, jd1);
			GamePlayer gp11 = new GamePlayer(p4, g7, jd1);
			GamePlayer gp12 = new GamePlayer(p3, g8, jd1);
			GamePlayer gp13 = new GamePlayer(p4, g8, jd1);

			//save gameplayers

			gamePlayerRepository.save(gp1);
			gamePlayerRepository.save(gp2);
			gamePlayerRepository.save(gp3);
			gamePlayerRepository.save(gp4);
			gamePlayerRepository.save(gp5);
			gamePlayerRepository.save(gp6);
			gamePlayerRepository.save(gp7);
			gamePlayerRepository.save(gp8);
			gamePlayerRepository.save(gp9);
			gamePlayerRepository.save(gp10);
			gamePlayerRepository.save(gp11);
			gamePlayerRepository.save(gp12);
			gamePlayerRepository.save(gp13);

			//create shipLocations

			List<String> shipLoc1 = new ArrayList<>();
			shipLoc1.add(0, "H2");
			shipLoc1.add(1, "H3");
			shipLoc1.add(2, "H4");
			List<String> shipLoc2 = new ArrayList<>();
			shipLoc2.add(0, "E1");
			shipLoc2.add(1, "F1");
			shipLoc2.add(2, "G1");
			List<String> shipLoc3 = new ArrayList<>();
			shipLoc3.add(0, "B4");
			shipLoc3.add(1, "B5");
			List<String> shipLoc4 = new ArrayList<>();
			shipLoc2.add(0, "B5");
			shipLoc2.add(1, "C5");
			shipLoc2.add(2, "D5");
			List<String> shipLoc5 = new ArrayList<>();
			shipLoc3.add(0, "C6");
			shipLoc3.add(1, "C7");
			List<String> shipLoc6 = new ArrayList<>();
			shipLoc2.add(0, "A2");
			shipLoc2.add(1, "A3");
			shipLoc2.add(2, "A4");
			List<String> shipLoc7 = new ArrayList<>();
			shipLoc3.add(0, "G6");
			shipLoc3.add(1, "H6");
			List<String> shipLoc8 = new ArrayList<>(Arrays.asList("B4", "B5", "B6"));


			//create ships

			Ship sh1 = new Ship("Destroyer", shipLoc1);
			Ship sh2 = new Ship("Submarine", shipLoc2);
			Ship sh3 = new Ship("Patrol Boat", shipLoc3);
			Ship sh4 = new Ship("Destroyer", shipLoc1);
			Ship sh5 = new Ship("Submarine", shipLoc2);
			Ship sh6 = new Ship("Patrol Boat", shipLoc3);
			Ship sh7 = new Ship("Destroyer", shipLoc1);
			Ship sh8 = new Ship("Patrol Boat", shipLoc3);
			Ship sh9 = new Ship("Patrol Boat", shipLoc3);
			Ship sh10 = new Ship("Destroyer", shipLoc4);
			Ship sh11 = new Ship("Patrol Boat", shipLoc5);
			Ship sh12 = new Ship("Submarine", shipLoc6);
			Ship sh13 = new Ship("Patrol Boat", shipLoc7);
			Ship sh14 = new Ship("Destroyer", shipLoc4);
			Ship sh15 = new Ship("Patrol Boat", shipLoc5);
			Ship sh16 = new Ship("Submarine", shipLoc6);
			Ship sh17 = new Ship("Patrol Boat", shipLoc7);

			//add ships to gameplayers

			gp1.addShips(sh1);
			gp1.addShips(sh2);
			gp1.addShips(sh3);
			gp2.addShips(sh4);
			gp2.addShips(sh6);
			gp3.addShips(sh7);
			gp3.addShips(sh8);
			gp4.addShips(sh5);
			gp4.addShips(sh9);
			gp5.addShips(sh10);
			gp5.addShips(sh11);
			gp6.addShips(sh12);
			gp6.addShips(sh13);
			gp7.addShips(sh14);
			gp7.addShips(sh15);
			gp8.addShips(sh16);
			gp8.addShips(sh17);

			//create salvoLocations

			List<String> salvoLoc1 = new ArrayList<>();
			salvoLoc1.add(0, "B5");
			salvoLoc1.add(1, "C5");
			salvoLoc1.add(2, "F1");
			List<String> salvoLoc2 = new ArrayList<>(Arrays.asList("B4", "B5", "B6"));
			List<String> salvoLoc3 = new ArrayList<>(Arrays.asList("F5", "D5"));
			List<String> salvoLoc4 = new ArrayList<>(Arrays.asList("E1", "H3", "A2"));
			List<String> salvoLoc5 = new ArrayList<>(Arrays.asList("A2", "A4", "G6"));
			List<String> salvoLoc6 = new ArrayList<>(Arrays.asList("B5", "D5", "C7"));
			List<String> salvoLoc7 = new ArrayList<>(Arrays.asList("A3", "H6"));
			List<String> salvoLoc8 = new ArrayList<>(Arrays.asList("C5", "C6"));
			List<String> salvoLoc9 = new ArrayList<>(Arrays.asList("G6", "H6", "A4"));
			List<String> salvoLoc10 = new ArrayList<>(Arrays.asList("H1", "H2", "H3"));
			List<String> salvoLoc11 = new ArrayList<>(Arrays.asList("A2", "A3", "D8"));
			List<String> salvoLoc12 = new ArrayList<>(Arrays.asList("E1", "F2", "G3"));
			List<String> salvoLoc13 = new ArrayList<>(Arrays.asList("A3", "A4", "F7"));
			List<String> salvoLoc14 = new ArrayList<>(Arrays.asList("B5", "C6", "H1"));
			List<String> salvoLoc15 = new ArrayList<>(Arrays.asList("A2", "G6", "H6"));
			List<String> salvoLoc16 = new ArrayList<>(Arrays.asList("C5", "C7", "D5"));

			//create salvoes

			Salvo s1 = new Salvo(1, salvoLoc1);
			Salvo s2 = new Salvo(1, salvoLoc2);
			Salvo s3 = new Salvo(2, salvoLoc3);
			Salvo s4 = new Salvo(2, salvoLoc4);
			Salvo s5 = new Salvo(1, salvoLoc5);
			Salvo s6 = new Salvo(1, salvoLoc6);
			Salvo s7 = new Salvo(2, salvoLoc7);
			Salvo s8 = new Salvo(2, salvoLoc8);
			Salvo s9 = new Salvo(1, salvoLoc9);
			Salvo s10 = new Salvo(1, salvoLoc10);
			Salvo s11 = new Salvo(2, salvoLoc11);
			Salvo s12 = new Salvo(2, salvoLoc12);
			Salvo s13 = new Salvo(1, salvoLoc13);
			Salvo s14 = new Salvo(1, salvoLoc14);
			Salvo s15 = new Salvo(2, salvoLoc15);
			Salvo s16 = new Salvo(2, salvoLoc16);

			//add salvoes to gamePlayers

			gp1.addSalvoes(s1);
			gp1.addSalvoes(s3);
			gp2.addSalvoes(s2);
			gp2.addSalvoes(s4);
			gp3.addSalvoes(s5);
			gp3.addSalvoes(s7);
			gp4.addSalvoes(s6);
			gp4.addSalvoes(s8);
			gp5.addSalvoes(s9);
			gp5.addSalvoes(s11);
			gp6.addSalvoes(s10);
			gp6.addSalvoes(s12);
			gp7.addSalvoes(s13);
			gp7.addSalvoes(s15);
			gp8.addSalvoes(s14);
			gp8.addSalvoes(s16);

			//save gamePlayers

			gamePlayerRepository.save(gp1);
			gamePlayerRepository.save(gp2);
			gamePlayerRepository.save(gp3);
			gamePlayerRepository.save(gp4);
			gamePlayerRepository.save(gp5);
			gamePlayerRepository.save(gp6);
			gamePlayerRepository.save(gp7);
			gamePlayerRepository.save(gp8);


			//save ships

			shipRepository.save(sh1);
			shipRepository.save(sh2);
			shipRepository.save(sh3);
			shipRepository.save(sh4);
			shipRepository.save(sh5);
			shipRepository.save(sh6);
			shipRepository.save(sh7);
			shipRepository.save(sh8);
			shipRepository.save(sh9);
			shipRepository.save(sh10);
			shipRepository.save(sh11);
			shipRepository.save(sh12);
			shipRepository.save(sh13);

			//save salvoes

			salvoRepository.save(s1);
			salvoRepository.save(s2);
			salvoRepository.save(s3);
			salvoRepository.save(s4);
			salvoRepository.save(s5);
			salvoRepository.save(s6);
			salvoRepository.save(s7);
			salvoRepository.save(s8);
			salvoRepository.save(s9);
			salvoRepository.save(s10);
			salvoRepository.save(s11);
			salvoRepository.save(s12);
			salvoRepository.save(s13);
			salvoRepository.save(s14);
			salvoRepository.save(s15);
			salvoRepository.save(s16);

		};

	}

}
