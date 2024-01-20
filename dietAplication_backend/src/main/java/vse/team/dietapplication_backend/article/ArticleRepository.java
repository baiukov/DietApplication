package vse.team.dietapplication_backend.article;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;
import vse.team.dietapplication_backend.utils.HibernateUtil;

@Repository
public class ArticleRepository {

    public String save(ArticleEntity entity) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = null;
        String generatedId = null;
        try {
            transaction = session.beginTransaction();
            generatedId = (String) session.save(entity);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null)
                transaction.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
        return generatedId;
    }

    public ArticleEntity getById(String id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            return session.get(ArticleEntity.class, id);
        } finally {
            session.close();
        }
    }

    public void update(ArticleEntity entity) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = null;
        try {
            transaction = session.beginTransaction();
            session.update(entity);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null)
                transaction.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }

    public void deleteById(String id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = null;
        try {
            transaction = session.beginTransaction();
            ArticleEntity entity = session.get(ArticleEntity.class, id);
            if (entity != null) {
                session.delete(entity);
            }
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null)
                transaction.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }
}
