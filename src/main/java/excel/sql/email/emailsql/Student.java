package excel.sql.email.emailsql;


import org.springframework.web.bind.annotation.GetMapping;

import javax.persistence.*;

@Entity
@Table(name = "Students_indexed_qr")
public class Student {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "user_name")
    private String name;
    private String email;
    @Column(name = "amount_remaining")
    private int amountRemaining;
    @Column(name = "is_registered")
    private String isRegistered;
    @Column(name = "is_band_provided")
    private String isBandProvided;


    public Student(int id, String name, String email, int amountRemaining, String isRegistered, String isBandProvided, byte[] qrCode) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.amountRemaining = amountRemaining;
        this.isRegistered = isRegistered;
        this.isBandProvided = isBandProvided;
    }

    public String getIsRegistered() {
        return isRegistered;
    }

    public void setIsRegistered(String isRegistered) {
        this.isRegistered = isRegistered;
    }

    public String getIsBandProvided() {
        return isBandProvided;
    }

    public void setIsBandProvided(String isBandProvided) {
        this.isBandProvided = isBandProvided;
    }

    public Student() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAmountRemaining() {
        return amountRemaining;
    }

    public void setAmountRemaining(int amountRemaining) {
        this.amountRemaining = amountRemaining;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", amountRemaining=" + amountRemaining +
                ", isRegistered='" + isRegistered + '\'' +
                ", isBandProvided='" + isBandProvided + '\'' +
                '}';
    }


}
