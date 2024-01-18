package vse.team.dietapplication_backend.comment;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.stereotype.Component;

import java.util.Date;

@Entity
@Table(name = "Comments")
@Component
public class CommentEntity {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", columnDefinition = "VARCHAR(255) CHARACTER SET utf8mb4")
    private String id;

    @Column(name = "content", columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
