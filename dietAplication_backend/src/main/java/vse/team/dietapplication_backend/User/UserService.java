package vse.team.dietapplication_backend.User;

import org.springframework.stereotype.Component;

/*
 * Třída UserService - je třída služby uživatelů, která se zabývá zpracováním jejích logiky.
 *
 * @author Aleksei Baiukov
 */
@Component
public class UserService {

    // metoda zjištující věk uživatele podle roku narození
    public Integer getAge(String yearOfBirth) {
        // vytvoří novou entitu uživatele
        UserEntity userEntity = new UserEntity();
        // nastaví ji rok, který byl získán
        userEntity.setYearOfBirth(yearOfBirth);

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
