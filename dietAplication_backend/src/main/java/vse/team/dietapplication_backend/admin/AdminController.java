package vse.team.dietapplication_backend.admin;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vse.team.dietapplication_backend.article.ArticleEntity;
import vse.team.dietapplication_backend.comment.CommentEntity;
import vse.team.dietapplication_backend.user.UserController;
import vse.team.dietapplication_backend.user.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController extends UserController {
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService, UserService userService) {
        super(userService);
        this.adminService = adminService;
    }

    @PostMapping("/{userId}/articles")
    public ResponseEntity<String> addArticle(@PathVariable String userId, @RequestBody ArticleEntity article) {
        return super.addArticle(userId, article);
    }

    @PutMapping("/{userId}/articles/{articleId}")
    public ResponseEntity<String> updateUserArticle(@PathVariable String userId, @PathVariable String articleId, @RequestBody ArticleEntity updatedArticle) {
        return super.updateUserArticle(userId, articleId, updatedArticle);
    }

    @PostMapping("/{userId}/comments")
    public ResponseEntity<String> addComment(@PathVariable String userId, @RequestBody CommentEntity comment) {
        return super.addComment(userId, comment);
    }

    @PutMapping("/{userId}/comments/{commentId}")
    public ResponseEntity<String> updateComment(@PathVariable String userId, @PathVariable String commentId, @RequestBody CommentEntity updatedComment) {
        return super.updateUserComment(userId, commentId, updatedComment);
    }

    @DeleteMapping("/articles/{articleId}")
    public ResponseEntity<String> deleteArticle(@PathVariable String articleId) {
        try {
            adminService.deleteArticle(articleId);
            return ResponseEntity.ok("Article with ID " + articleId + " was successfully deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable String commentId) {
        try {
            adminService.deleteComment(commentId);
            return ResponseEntity.ok("Comment with ID " + commentId + " was successfully deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/blockUser/{userId}")
    public ResponseEntity<String> blockUser(@PathVariable String userId) {
        try {
            adminService.blockUser(userId);
            return ResponseEntity.ok("User with ID " + userId + " was successfully blocked.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
