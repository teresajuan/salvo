package salvo.salvo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.swing.*;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


@Entity
public class Game {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;
    private Date creationDate;

    public Game() {}

    public Game(Date date) {
        this.creationDate = date;
    }

    public long getId() {
        return id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date date) {
        this.creationDate = date;
    }

//    public String toString() {
//        return "" + creationDate ;
//    }

}
