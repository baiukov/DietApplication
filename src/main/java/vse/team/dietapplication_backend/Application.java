package vse.team.dietapplication_backend;

import vse.team.dietapplication_backend.enums.Events;

import java.util.HashMap;

public class Application {
    private static final HashMap<Events, Function> events = new HashMap<>();

    public static void on(Events eventName, Function func) {
        events.put(eventName, func);
    }

    // Method to trigger local events
    public static void emit(Events eventName, Object data) {
        events.get(eventName).apply(data);
    }

    @FunctionalInterface
    public interface Function {
        void apply(Object data);
    }

}
