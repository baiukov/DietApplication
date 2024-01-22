package vse.team.dietapplication_backend.user;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.article.ArticleEntity;
import vse.team.dietapplication_backend.comment.CommentEntity;
import vse.team.dietapplication_backend.profile.ProfileEntity;

import java.util.List;

@Entity
@Table(name = "Users")
@Component
@Access(AccessType.FIELD)
public class UserEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

//    @OneToOne(cascade = CascadeType.ALL,
//            orphanRemoval = true,
//            fetch = FetchType.LAZY,
//            mappedBy = "user")
//    private ProfileEntity profile;

//    @OneToMany(cascade = CascadeType.ALL,
//            orphanRemoval = true,
//            fetch = FetchType.LAZY,
//            mappedBy = "author")
//    private List<CommentEntity> comments;
//
//    @OneToMany(cascade = CascadeType.ALL,
//            orphanRemoval = true,
//            fetch = FetchType.LAZY,
//            mappedBy = "author")
//    private List<ArticleEntity> articles;

    @Column(name = "email", length = 50, nullable = false)
    private String email;

    @Column(name = "password", length = 1000, nullable = false)
    private String password;

    @Column(name = "year_of_birth", nullable = false)
    private int yearOfBirth;

    @Column(name = "sex", nullable = false)
    private String sex;

    @Column(name = "is_blocked", nullable = false)
    private Boolean isBlocked;

    @Column(name = "is_admin", nullable = false)
    private Boolean isAdmin;

    public String getId() {
        return id;
    }

//    public ProfileEntity getProfile() {
//        return profile;
//    }

//    public List<CommentEntity> getComments() {
//        return comments;
//    }
//
//    public List<ArticleEntity> getArticles() {
//        return articles;
//    }

    public String getEmail() {
        return email;
    }

    public String getPassword() { return password; }

    public int getYearOfBirth() {
        return yearOfBirth;
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

    public void setId(String id) {
        this.id = id;
    }

/*    public void setProfile(ProfileEntity profile) {
        this.profile = profile;
    }*/

//    public void setComments(List<CommentEntity> comments) {
//        this.comments = comments;
//    }
//
//    public void setArticles(List<ArticleEntity> articles) {
//        this.articles = articles;
//    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) { this.password = password; }

    public void setYearOfBirth(int yearOfBirth) {
        this.yearOfBirth = yearOfBirth;
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
}