package vse.team.dietapplication_backend.admin;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vse.team.dietapplication_backend.article.ArticleEntity;
import vse.team.dietapplication_backend.article.ArticleService;
import vse.team.dietapplication_backend.comment.CommentEntity;
import vse.team.dietapplication_backend.comment.CommentService;
import vse.team.dietapplication_backend.user.UserEntity;
import vse.team.dietapplication_backend.user.UserRepository;
import vse.team.dietapplication_backend.user.UserService;

@Service
public class AdminService extends UserService {
    @Autowired
    public AdminService(UserRepository userRepository, ArticleService articleService, CommentService commentService) {
        super(userRepository, articleService, commentService);
    }

    public void deleteArticle(String articleId) {
        ArticleEntity article = super.articleService.getArticleById(articleId);
        if (article != null) {
            super.articleService.deleteArticle(articleId);
        } else {
            throw new EntityNotFoundException("Article not found with ID: " + articleId);
        }
    }

    public void deleteComment(String commentId) {
        CommentEntity comment = super.commentService.getCommentById(commentId);
        if (comment != null) {
            super.commentService.deleteComment(commentId);
        } else {
            throw new EntityNotFoundException("Comment not found with ID: " + commentId);
        }
    }

    public void blockUser(String userId) {
        UserEntity user = userRepository.getById(userId);
        if (user != null) {
            user.setIsBlocked(true);
            super.userRepository.update(user);
        } else {
            throw new EntityNotFoundException("User not found with ID: " + userId);
        }
    }
}

