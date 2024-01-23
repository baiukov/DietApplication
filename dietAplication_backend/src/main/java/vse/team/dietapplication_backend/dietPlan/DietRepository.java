package vse.team.dietapplication_backend.dietPlan;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;
import vse.team.dietapplication_backend.courses.CourseEntity;
import vse.team.dietapplication_backend.days.DayEntity;
import vse.team.dietapplication_backend.food.FoodEntity;
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
    public List<CourseEntity> getCourseByDay(DayEntity day) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM CourseEntity D WHERE D.day = :day";
            Query<CourseEntity> query = session.createQuery(hql, CourseEntity.class);
            query.setParameter("day", day);
            List<CourseEntity> results = query.list();
            return results;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public List<FoodEntity> getFoodByCourse(CourseEntity course) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM FoodEntity D WHERE D.course = :course";
            Query<FoodEntity> query = session.createQuery(hql, FoodEntity.class);
            query.setParameter("course", course);
            List<FoodEntity> results = query.list();
            return results;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public List<DayEntity> getDaysByPlan(DietEntity plan) {
        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            String hql = "FROM DayEntity D WHERE D.plan = :plan";
            Query<DayEntity> query = session.createQuery(hql, DayEntity.class);
            query.setParameter("plan", plan);
            List<DayEntity> results = query.list();
            return results;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public void deleteFirstDietPlanByUser(String userId) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();

            // Retrieve the user entity
            UserEntity user = session.get(UserEntity.class, userId);
            if (user != null) {
                // Use the existing getByUser method to get diet plans
                List<DietEntity> dietPlans = getByUser(user);
                if (!dietPlans.isEmpty()) {
                    // Get the first diet plan
                    DietEntity firstDietPlan = dietPlans.get(0);
                    // Delete the first diet plan
                    session.delete(firstDietPlan);
                }
            }

            tx.commit();
        } catch (RuntimeException e) {
            if (tx != null) tx.rollback();
            throw e;
        } finally {
            session.close();
        }
    }


}
