package vse.team.dietapplication_backend.article;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vse.team.dietapplication_backend.user.UserEntity;
import vse.team.dietapplication_backend.user.UserRepository;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
    }

    public String createArticle(ArticleEntity article, String userId) {
        UserEntity user = null;
        try {
            user = userRepository.getById(userId);
        } catch (Exception e) {
            throw new EntityNotFoundException("User not found with ID: " + userId);
        }
        article.setAuthor(user);
        return this.articleRepository.save(article);
    }

    public void updateArticle(String articleId, ArticleEntity updatedArticle) {
        ArticleEntity oldArticle = articleRepository.getById(articleId);
        if (oldArticle != null) {
            oldArticle.setContent(updatedArticle.getContent());
            articleRepository.update(oldArticle);
        } else {
            throw new EntityNotFoundException("Article not found with ID: " + articleId);
        }
    }

    public void deleteArticle(String articleId) {
        articleRepository.deleteById(articleId);
    }

    public ArticleEntity getArticleById(String id) {
        return articleRepository.getById(id);
    }
}

