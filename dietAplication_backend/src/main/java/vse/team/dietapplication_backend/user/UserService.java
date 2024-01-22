package vse.team.dietapplication_backend.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.article.ArticleEntity;
import vse.team.dietapplication_backend.article.ArticleService;
import vse.team.dietapplication_backend.comment.CommentEntity;
import vse.team.dietapplication_backend.comment.CommentService;

/*
 * Třída UserService - je třída služby uživatelů, která se zabývá zpracováním jejích logiky.
 *
 * @author Aleksei Baiukov
 */
@Component
public class UserService {

    protected final UserRepository userRepository;
    protected final ArticleService articleService;
    protected final CommentService commentService;

    @Autowired
    public UserService(UserRepository userRepository, ArticleService articleService, CommentService commentService) {
        this.userRepository = userRepository;
        this.articleService = articleService;
        this.commentService = commentService;
    }

    public String addArticleForUser(ArticleEntity article, String userId) {
        return articleService.createArticle(article, userId);
    }

    public void updateArticleForUser(String articleId, ArticleEntity updatedArticle, String userId) {
        UserEntity user = null;
        CommentEntity existingArticle = null;
        try {
            user = userRepository.getById(userId);
        } catch (Exception e) {
            throw new EntityNotFoundException("User not found with ID: " + userId);
        }
        try {
            existingArticle = commentService.getCommentById(articleId);
        } catch (Exception e) {
            throw new EntityNotFoundException("Article not found with ID: " + articleId);
        }
        if (existingArticle.getAuthor() != null && existingArticle.getAuthor().getId().equals(userId)) {
            articleService.updateArticle(articleId, updatedArticle);
        } else {
            throw new IllegalArgumentException("User is not authorized to update this article.");
        }
    }

    public String addCommentForUser(CommentEntity comment, String userId) {
        return commentService.createComment(comment, userId);
    }

    public void updateCommentForUser(String commentId, CommentEntity updatedComment, String userId) {
        UserEntity user = null;
        CommentEntity existingComment = null;
        try {
            user = userRepository.getById(userId);
        } catch (Exception e) {
            throw new EntityNotFoundException("User not found with ID: " + userId);
        }
        try {
            existingComment = commentService.getCommentById(commentId);
        } catch (Exception e) {
            throw new EntityNotFoundException("Comment not found with ID: " + commentId);
        }
        if (existingComment.getAuthor() != null && existingComment.getAuthor().getId().equals(userId)) {
            commentService.updateComment(commentId, updatedComment);
        } else {
            throw new IllegalArgumentException("User is not authorized to update this comment.");
        }
    }

    // metoda zjištující věk uživatele podle roku narození
    public Integer getAge(String yearOfBirth) {
        // vytvoří novou entitu uživatele
        UserEntity userEntity = new UserEntity();
        // nastaví ji rok, který byl získán
        userEntity.setYearOfBirth(Integer.parseInt(yearOfBirth));

        // vytvoří novou instanci správce repositáře
        UserRepository userRepository = new UserRepository();
        // pokusí se nového uživatele uložit do uložiště
        String id = userRepository.save(userEntity);

        // získá nového uživatele podle identifikáčního čísla
        UserEntity savedUser = userRepository.getById(id);

        // odečte z letošního roku, který je získán z db, rok narození
        Integer answer = savedUser.getCurrentYear() - savedUser.getYearOfBirth();
        // vrátí odpověď
        return answer;
    }
}
