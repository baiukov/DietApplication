package vse.team.dietapplication_backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "example")
@Component
public class UserEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

    @Column(name = "current_year")
    private int currentYear = 2024;

    @Column(name = "year_of_birth")
    private String yearOfBirth;

    public String getId() {
        return id;
    }

    public int getCurrentYear() {
        return currentYear;
    }

    public String getYearOfBirth() {
        return yearOfBirth;
    }

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