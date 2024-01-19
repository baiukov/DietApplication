package vse.team.dietapplication_backend.comment;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;
import vse.team.dietapplication_backend.utils.HibernateUtil;

@Repository
public class CommentRepository {

    public String save(CommentEntity entity) {
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

    public CommentEntity getById(String id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            return session.get(CommentEntity.class, id);
        } finally {
            session.close();
        }
    }

    public void update(CommentEntity entity) {
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
            CommentEntity entity = session.get(CommentEntity.class, id);
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
