package vse.team.dietapplication_backend.days;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.courses.CourseEntity;
import vse.team.dietapplication_backend.dietPlan.DietEntity;
import vse.team.dietapplication_backend.dietPlan.IDietEntity;
import vse.team.dietapplication_backend.user.UserEntity;

import java.time.LocalDate;
import java.util.List;

@EntityScan
@Entity
@Table(name="Days")
@Component
public class DayEntity implements IDietEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", referencedColumnName = "id")
    private DietEntity plan;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY,
            mappedBy = "day"
    )
    private List<CourseEntity> courses;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public DietEntity getPlan() {
        return plan;
    }

    public void setPlan(DietEntity plan) {
        this.plan = plan;
    }

    public List<CourseEntity> getCourses() {
        return courses;
    }

    public void setCourses(List<CourseEntity> courses) {
        this.courses = courses;
    }


}
