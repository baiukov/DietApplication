package com.example.dietaplication_backend;

public class DataRequest {
    private String key;
    private String value;

    // Constructors
    public DataRequest() {
    }

    public DataRequest(String key, String value) {
        this.key = key;
        this.value = value;
    }

    // Getters and Setters
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}