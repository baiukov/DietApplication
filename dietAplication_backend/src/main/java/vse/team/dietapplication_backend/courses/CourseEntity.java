package vse.team.dietapplication_backend.courses;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.days.DayEntity;
import vse.team.dietapplication_backend.dietPlan.DietEntity;
import vse.team.dietapplication_backend.dietPlan.IDietEntity;
import vse.team.dietapplication_backend.food.FoodEntity;
import vse.team.dietapplication_backend.user.UserEntity;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.List;

@EntityScan
@Entity
@Table(name="Courses")
@Component
public class CourseEntity implements IDietEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "day_id", referencedColumnName = "id")
    private DayEntity day;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY,
            mappedBy = "course"
    )
    private List<FoodEntity> food;

    @Column(name="name", length = 255)
    public String name;

    public String getName() {
        return name;
    }

    public List<FoodEntity> getFood() {
        return food;
    }

    public void setFood(List<FoodEntity> food) {
        this.food = food;
    }

    public DayEntity getDay() {
        return day;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDay(DayEntity day) {
        this.day = day;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
