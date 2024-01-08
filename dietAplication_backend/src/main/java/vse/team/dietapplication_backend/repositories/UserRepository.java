package vse.team.dietapplication_backend.repositories;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import vse.team.dietapplication_backend.utils.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;
import vse.team.dietapplication_backend.entities.UserEntity;

@Repository
public class UserRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public String save(UserEntity entity) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = null;
        String generatedId = null;

        try {
            transaction = session.beginTransaction();
            generatedId = (String) session.save(entity);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        return generatedId;
    }

    public UserEntity getById(String id) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            return session.get(UserEntity.class, id);
        } finally {
            session.close();
        }
    }

}
