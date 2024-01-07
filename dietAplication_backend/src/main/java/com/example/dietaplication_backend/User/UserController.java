package com.example.dietaplication_backend.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController()
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/SendAge")
    public ResponseEntity<String> handleDataRequest(@RequestBody UserDataRequest requestData) {
        try {
            List<String> value = requestData.getData();

            Integer answer = User.getAge(Integer.parseInt(value.get(0)));
            return ResponseEntity.ok(answer.toString());
            // return ResponseEntity.ok(Integer.toString(age));
        } catch (Exception e) {
            // Handle any exceptions that may occur during processing
            return ResponseEntity.status(500).body("Error processing data: " + e.getMessage());
        }
    }
}
