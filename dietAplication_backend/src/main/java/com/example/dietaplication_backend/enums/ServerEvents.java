package com.example.dietaplication_backend.enums;

public enum ServerEvents {
    SENDAGE("0");

    public final String key;

    ServerEvents (String description) {
        this.key = description;
    }
}
