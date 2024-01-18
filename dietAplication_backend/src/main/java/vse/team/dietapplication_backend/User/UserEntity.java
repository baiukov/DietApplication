package vse.team.dietapplication_backend.User;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;

@Entity
@Table(name = "Users")
@Component
public class UserEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    private int currentYear = 2024;

    @Column(name = "year_of_birth", nullable = false)
    private int yearOfBirth;

    @Column(name = "sex", nullable = false)
    private String sex;

    @Column(name = "is_blocked", nullable = false)
    private Boolean isBlocked;

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public int getCurrentYear() {
        return currentYear;
    }

    public int getYearOfBirth() {
        return yearOfBirth;
    }

    public String getSex() {
        return sex;
    }

    public boolean getIsBlocked() {
        return isBlocked;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCurrentYear(int currentYear) {
        this.currentYear = currentYear;
    }

    public void setYearOfBirth(int yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setIsBlocked(Boolean isBlocked) {
        this.isBlocked = isBlocked;
    }
}