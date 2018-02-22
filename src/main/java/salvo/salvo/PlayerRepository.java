package salvo.salvo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByUserName(String userName);
    Player findOneByUserName(String userName);

}