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
	public CommandLineRunner initData(PlayerRepository playerRepository, GameRepository gameRepository, GamePlayerRepository gamePlayerRepository, ShipRepository shipRepository) {
		return (args) -> {
			// save a couple of customers

			Player p1 = new Player("j.bauer@ctu.gov");
			Player p2 = new Player("c.obrian@ctu.gov");
			Player p3 = new Player("kim_bauer@gmail.com");
			Player p4 = new Player("t.almeida@ctu.gov");

			playerRepository.save(p1);
			playerRepository.save(p2);
			playerRepository.save(p3);
			playerRepository.save(p4);

			Date d1 = new Date();
			Date d2 = Date.from(d1.toInstant().plusSeconds(3600));
			Date d3 = Date.from(d1.toInstant().plusSeconds(7200));

			Game g1 = new Game(d1);
			Game g2 = new Game(d2);
			Game g3 = new Game(d3);
			Game g4 = new Game(d1);
			Game g5 = new Game(d1);
			Game g6 = new Game(d1);
			Game g7 = new Game(d1);
			Game g8 = new Game(d1);

			gameRepository.save(g1);
			gameRepository.save(g2);
			gameRepository.save(g3);
			gameRepository.save(g4);
			gameRepository.save(g5);
			gameRepository.save(g6);
			gameRepository.save(g7);
			gameRepository.save(g8);

			Date jd1 = new Date();

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

			Ship sh1 = new Ship("Destroyer", shipLoc1);
			Ship sh2 = new Ship("Submarine", shipLoc2);
			Ship sh3 = new Ship("Patrol Boat", shipLoc3);
			Ship sh4 = new Ship("Destroyer", shipLoc1);
			Ship sh5 = new Ship("Submarine", shipLoc2);
			Ship sh6 = new Ship("Patrol Boat", shipLoc3);
			Ship sh7 = new Ship("Destroyer", shipLoc1);
			Ship sh8 = new Ship("Patrol Boat", shipLoc3);
			Ship sh9 = new Ship("Patrol Boat", shipLoc3);


			gp1.addShips(sh1);
			gp1.addShips(sh2);
			gp1.addShips(sh3);
			gp2.addShips(sh4);
			gp2.addShips(sh6);
			gp3.addShips(sh7);
			gp3.addShips(sh8);
			gp4.addShips(sh5);
			gp4.addShips(sh9);


			gamePlayerRepository.save(gp1);
			gamePlayerRepository.save(gp2);
			gamePlayerRepository.save(gp3);
			gamePlayerRepository.save(gp4);


			shipRepository.save(sh1);
			shipRepository.save(sh2);
			shipRepository.save(sh3);
			shipRepository.save(sh4);
			shipRepository.save(sh5);
			shipRepository.save(sh6);
			shipRepository.save(sh7);
			shipRepository.save(sh8);
			shipRepository.save(sh9);

		};

	}

}
