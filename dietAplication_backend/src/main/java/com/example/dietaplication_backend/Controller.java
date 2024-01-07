package com.example.dietaplication_backend;

import com.example.dietaplication_backend.User.User;
import com.example.dietaplication_backend.enums.ServerEvents;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController()
@RequestMapping("/api")
public class Controller {
    @PostMapping("/data")
    public ResponseEntity<String> handleDataRequest(@RequestBody DataRequest requestData) {
        try {
            // Process the incoming data
            String key = requestData.getKey();
            String value = requestData.getValue();

            // Perform any necessary business logic with the data

            if (Objects.equals(key, ServerEvents.SENDAGE.key)) {
                Integer answer = User.getAge(Integer.parseInt(value));
                return ResponseEntity.ok(answer.toString());
            }
           // return ResponseEntity.ok(Integer.toString(age));
        } catch (Exception e) {
            // Handle any exceptions that may occur during processing
            return ResponseEntity.status(500).body("Error processing data: " + e.getMessage());
        }
        return null;
    }

    @GetMapping("/api/data/error")
    public String handleError() {
        // Custom error handling logic
        return "Error handling page";
    }
}