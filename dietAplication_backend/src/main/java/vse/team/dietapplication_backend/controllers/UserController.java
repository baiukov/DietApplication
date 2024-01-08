package vse.team.dietapplication_backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vse.team.dietapplication_backend.requests.UserDataRequest;
import vse.team.dietapplication_backend.services.UserService;

import java.util.List;

/*

 */
@RestController()
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/sendAge")
    public ResponseEntity<String> handleDataRequest(@RequestBody UserDataRequest requestData) {
        try {
            List<String> value = requestData.getData();

            return ResponseEntity.ok(this.userService.getAge(value.get(0)).toString());
        } catch (Exception e) {
            // Handle any exceptions that may occur during processing
            return ResponseEntity.status(500).body("Error processing data: " + e.getMessage());
        }
    }
}
