package vse.team.dietapplication_backend.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
 * Třída UserController - je třída správce uživatelů, která se zabývá operováním událostí.
 * Nejdřív nastaví příslušné mapování, pak při vyvolání některého z těch mapování, spustí příslušnou metodu ze služby,
 * vygeneruje a pošle odpověď
 *
 * @author Aleksei Baiukov
 */
@RestController()
@RequestMapping("/api")
public class UserController {

    // konstantní proměnná služby uživatelů
    private final UserService userService;

    // v konstruktoru třídy si uloží službu do proměnné
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // nastavení mapování událostí sendAge
    @PostMapping("user/sendAge")
    public ResponseEntity<String> handleDataRequest(@RequestBody UserDataRequest requestData) {
        try {
            // získá data z třídy parsera UserDataRequest
            List<String> value = requestData.getData();
            // pošle data ke zpracování službě, a dostane zpět odpověď
            String answer = this.userService.getAge(value.get(0)).toString();
            // odpoví na požadavek
            return ResponseEntity.ok(answer);
        } catch (Exception e) {
            // pokud zvnikla nějaká chyba, pošle kód 500 a název chyby
            return ResponseEntity.status(500).body("Error processing data: " + e.getMessage());
        }
    }
}
