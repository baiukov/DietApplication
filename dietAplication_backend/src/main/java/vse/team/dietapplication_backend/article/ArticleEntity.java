package vse.team.dietapplication_backend.article;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.comment.CommentEntity;
import vse.team.dietapplication_backend.user.UserEntity;

import java.util.Date;
import java.util.List;

@EntityScan
@Entity
@Table(name = "Articles")
@Component
public class ArticleEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private UserEntity author;

    @OneToMany(cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY,
            mappedBy = "article")
    private List<CommentEntity> comments;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date createdAt;

    public String getId() {
        return id;
    }

    public UserEntity getAuthor() {
        return author;
    }

    public List<CommentEntity> getComments() {
        return comments;
    }

    public String getContent() {
        return content;
    }

    public String getName() {
        return name;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAuthor(UserEntity author) {
        this.author = author;
    }

    public void setComments(List<CommentEntity> comments) {
        this.comments = comments;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setName(String  name) {
        this.name = name;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}

