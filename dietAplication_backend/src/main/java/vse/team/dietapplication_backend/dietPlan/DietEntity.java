package vse.team.dietapplication_backend.dietPlan;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.days.DayEntity;
import vse.team.dietapplication_backend.user.UserEntity;

import java.util.List;

@EntityScan
@Entity
@Table(name="diet_plans")
@Component
public class DietEntity implements IDietEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY,
            mappedBy = "plan"
    )
    private List<DayEntity> days;

    @Column(name="name", length = 255)
    private String name;

    @Column(name="description", length = 1023)
    private String description;

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<DayEntity> getDays() {
        return days;
    }

    public void setDays(List<DayEntity> days) {
        this.days = days;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
