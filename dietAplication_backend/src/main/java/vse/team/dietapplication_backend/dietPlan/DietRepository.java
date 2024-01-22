package vse.team.dietapplication_backend.dietPlan;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import vse.team.dietapplication_backend.user.UserEntity;
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
public class DietRepository {

    // metoda uložení nové entity uživatele
    public String save(IDietEntity dietEntity) {
        // vytvoří novou relaci pro provedení transakce
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = null;
        String generatedId = null;

        try {
            // spustí novou transakci
            transaction = session.beginTransaction();
            // nastaví transakci na uložení nového uživatele do tabulky, a vrácení zpět jeho ID
            session.saveOrUpdate(dietEntity);

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

    public List<DietEntity> getByUser(UserEntity user) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM DietEntity D WHERE D.user = :user";
            Query<DietEntity> query = session.createQuery(hql, DietEntity.class);
            query.setParameter("user", user);
            List<DietEntity> results = query.list();
            return results;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
