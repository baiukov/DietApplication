package vse.team.dietapplication_backend.user;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import vse.team.dietapplication_backend.profile.ProfileEntity;
import vse.team.dietapplication_backend.utils.HibernateUtil;

import java.util.List;

/*
 * Třída UserRepository - je třída repositáře uživatele, která se zabývá operováním s jeho uložištěm.
 * V této třídě jsou definováné metody komunikace s uložištěm, které budou zajištěny transakcemi
 * knihovny Hibernate
 *
 * @author Aleksei Baiukov
 */
@Repository
public class UserRepository {

    // metoda uložení nové entity uživatele
    public String save(UserEntity user) {
        // vytvoří novou relaci pro provedení transakce
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = null;
        String generatedId = null;

        try {
            // spustí novou transakci
            transaction = session.beginTransaction();
            // nastaví transakci na uložení nového uživatele do tabulky, a vrácení zpět jeho ID
            session.save(user);

            // pokusí se provést tuto transakci
            transaction.commit();
        } catch (Exception e) {
            // pokud nebyla uspěšná, vrátí všechno, co bylo provedeno zpět
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        } finally {
            // každopadně tuto relaci nakonec ukončí
            session.close();
        }
        // vrátí nové identifikáční číslo
        return generatedId;
    }

    // metoda vyhledávání uživatele podle identifikáčního čísla
    public UserEntity getById(String id) {
        // vytvoří novou relaci pro provedení transakce
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            // pokusí se najít a vygenerovat entitu uživatele, pokud taková je, vrátí ji
            return session.get(UserEntity.class, id);
        } finally {
            // každopadně nakonec relaci ukončí
            session.close();
        }
    }

    public UserEntity getByEmail(String email) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM UserEntity U WHERE U.email = :email";
            Query<UserEntity> query = session.createQuery(hql, UserEntity.class);
            query.setParameter("email", email);
            List<UserEntity> results = query.list();

            if (!results.isEmpty()) {
                return results.get(0);
            } else {
                return null; // No user found with the specified email
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public void update(UserEntity entity) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = null;
        try  {
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
            UserEntity entity = session.get(UserEntity.class, id);
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
