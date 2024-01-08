package vse.team.dietapplication_backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*
 * Třída UserEntity - je třída entity uživatele, která se zabývá kozistence dat uživatele.
 * Pomocí této třídy dá se uložit uživatele ve správní podobě do databáze a zaroveň si ho pak načíst
 *
 * @author Aleksei Baiukov
 */
@Entity
@Table(name = "example") // název příslušné tabulky
@Component
public class UserEntity {
    // položka id u uživatele je vygenerována pomocí metody uuid a uložená v podbě řádku
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(36) CHARACTER SET utf8mb4")
    private String id;

    // položka současný rok
    @Column(name = "current_year") // název sloupce v db
    private int currentYear = 2024;

    // položka rok narození
    @Column(name = "year_of_birth") // název sloupce v db
    private String yearOfBirth;

    // Gettery
    public String getId() {
        return id;
    }

    public int getCurrentYear() {
        return currentYear;
    }

    public String getYearOfBirth() {
        return yearOfBirth;
    }

    // Settery
    public void setId(String id) {
        this.id = id;
    }

    public void setCurrentYear(int currentYear) {
        this.currentYear = currentYear;
    }

    public void setYearOfBirth(String yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
    }
}