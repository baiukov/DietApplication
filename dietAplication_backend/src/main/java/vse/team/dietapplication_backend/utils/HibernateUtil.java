package vse.team.dietapplication_backend.utils;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Component;
import vse.team.dietapplication_backend.article.ArticleEntity;
import vse.team.dietapplication_backend.comment.CommentEntity;
import vse.team.dietapplication_backend.profile.ProfileEntity;
import vse.team.dietapplication_backend.user.UserEntity;

/*
 * Třída HibernateUtil - je pomocní třída pro knihovnu Hibernate, nastaví konfiguraci práce s databází
 *
 * @author Aleksei Baiukov
 */
@Component
public class HibernateUtil {

    private static SessionFactory sessionFactory;

    static {
        try {
            // vytvoří the SessionFactory
            sessionFactory = new Configuration().configure("hibernate.cfg.xml")
                    .addAnnotatedClass(UserEntity.class) // přídá entitu ke zpracování
                    .addAnnotatedClass(ProfileEntity.class)
                    .addAnnotatedClass(ArticleEntity.class)
                    .addAnnotatedClass(CommentEntity.class)
                    .buildSessionFactory();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ExceptionInInitializerError("Could not initialize Hibernate!");
        }
    }

    // Getter
    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}