package vse.team.dietapplication_backend.user;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.article.ArticleEntity;
import vse.team.dietapplication_backend.comment.CommentEntity;
import vse.team.dietapplication_backend.dietPlan.DietEntity;
import vse.team.dietapplication_backend.profile.ProfileEntity;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Users")
@Component
public class UserEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

    @OneToOne(cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY,
            mappedBy = "user")
    private ProfileEntity profile;

    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY,
            mappedBy = "author")
    private List<CommentEntity> comments;

    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY,
            mappedBy = "author")
    private List<ArticleEntity> articles;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY,
            mappedBy = "user"
    )
    private List<DietEntity> plans;

    @Column(name = "email", length = 50, nullable = false, unique = true)
    private String email;

    @Column(name = "password", length = 1000, nullable = false)
    private String password;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "sex", nullable = false)
    private String sex;

    @Column(name = "is_blocked", nullable = false)
    private Boolean isBlocked;

    @Column(name = "is_admin", nullable = false)
    private Boolean isAdmin;

    public String getId() {
        return id;
    }

    public ProfileEntity getProfile() {
        return profile;
    }

    public List<CommentEntity> getComments() {
        return comments;
    }

    public List<ArticleEntity> getArticles() {
        return articles;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getSex() {
        return sex;
    }

    public boolean getIsBlocked() {
        return isBlocked;
    }

    public boolean getIsAdmin() {
        return isAdmin;
    }

    public List<DietEntity> getPlans() {
        return plans;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setProfile(ProfileEntity profile) {
        this.profile = profile;
    }

    public void setComments(List<CommentEntity> comments) {
        this.comments = comments;
    }

    public void setArticles(List<ArticleEntity> articles) {
        this.articles = articles;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setIsBlocked(Boolean isBlocked) {
        this.isBlocked = isBlocked;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public void setPlans(List<DietEntity> plans) { this.plans = plans; }
}