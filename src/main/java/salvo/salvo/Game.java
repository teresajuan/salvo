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
    private String creationDate;




    public Game(String date) {
        this.creationDate = date;

    }

    public void creationCurrentDate(){

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
    String date = sdf.format(new Date());

    }

    public long getId() {
        return id;
    }

//    public StringBuffer getCreationDate() {
//        return creationDate;
//    }
//
//    public void setCreationDate(StringBuffer date) {
//        this.creationDate = date;
//    }

//    public String toString() {
//        return "" ;
//    }

}
