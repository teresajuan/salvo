package salvo.salvo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.text.SimpleDateFormat;
import java.util.Date;

@SpringBootApplication
public class SalvoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalvoApplication.class, args);

	}
	@Bean
	public CommandLineRunner initData(PlayerRepository playerRepository, GameRepository gameRepository, GamePlayerRepository gamePlayerRepository) {
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


		};

	}


}