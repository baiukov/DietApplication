package com.example.dietaplication_backend;

import com.example.dietaplication_backend.enums.ServerEvents;

import java.util.HashMap;

public class Application {

    public static HashMap<String, Runnable> events = new HashMap<>();

    public static void on(ServerEvents eventName, Runnable function) {
        Application.events.put(String.valueOf(eventName), function);
    }
}
