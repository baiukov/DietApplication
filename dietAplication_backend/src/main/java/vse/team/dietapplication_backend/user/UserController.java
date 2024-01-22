package vse.team.dietapplication_backend.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vse.team.dietapplication_backend.article.ArticleEntity;
import vse.team.dietapplication_backend.comment.CommentEntity;

import java.util.List;

/*
 * Třída UserController - je třída správce uživatelů, která se zabývá operováním událostí.
 * Nejdřív nastaví příslušné mapování, pak při vyvolání některého z těch mapování, spustí příslušnou metodu ze služby,
 * vygeneruje a pošle odpověď
 *
 * @author Aleksei Baiukov
 */
@RestController()
@RequestMapping("/api/user")
public class UserController {

    // konstantní proměnná služby uživatelů
    private final UserService userService;


    // v konstruktoru třídy si uloží službu do proměnné
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/{userId}/articles")
    public ResponseEntity<String> addArticle(@PathVariable String userId, @RequestBody ArticleEntity article) {
        try {
            String articleId = userService.addArticleForUser(article, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Article created successfully with ID: " + articleId + "\n" +
                "By user: " + userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{userId}/articles/{articleId}")
    public ResponseEntity<String> updateUserArticle(@PathVariable String userId, @PathVariable String articleId, @RequestBody ArticleEntity updatedArticle) {
        try {
            userService.updateArticleForUser(userId, updatedArticle, articleId);
            return ResponseEntity.ok("Article updated successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/{userId}/comments")
    public ResponseEntity<String> addComment(@PathVariable String userId, @RequestBody CommentEntity comment) {
        try {
            String commentId = userService.addCommentForUser(comment, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Comment created successfully with ID: " + commentId + "\n" +
                    "By user: " + userId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{userId}/comments/{commentId}")
    public ResponseEntity<String> updateUserComment(@PathVariable String userId, @PathVariable String commentId, @RequestBody CommentEntity updatedComment) {
        try {
            userService.updateCommentForUser(userId, updatedComment, commentId);
            return ResponseEntity.ok("Comment updated successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // nastavení mapování událostí sendAge
    @PostMapping("/sendAge")
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

    @PostMapping("/login")
    public ResponseEntity<String> authorise(@RequestBody UserAccountRequest requestData) {
        try {

            List<String> inputData = requestData.getData();

            String email = inputData.get(0);
            String password = inputData.get(1);



            String response = userService.authorise(email, password);
            System.out.println(response);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Boolean> register(@RequestBody UserAccountRequest requestData) {
        try {
            List<String> inputData = requestData.getData();

            String email = inputData.get(0);
            String password = inputData.get(1);
            String gender = inputData.get(2);
            double height = Double.parseDouble(inputData.get(3));
            double weight = Double.parseDouble(inputData.get(4));
            String dateOfBirth = inputData.get(5);

            userService.save(
                    email,
                    password,
                    gender,
                    dateOfBirth,
                    height,
                    weight
            );
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(false);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Boolean> update(@RequestBody UserAccountRequest requestData) {
        try {
            List<String> inputData = requestData.getData();

            String userID = inputData.get(0);
            String paramName = inputData.get(1);
            String parameter = inputData.get(2);

            this.userService.update(userID, paramName, parameter);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(false);
        }
    }

}
