package com.example.dietaplication_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;

import java.net.InetAddress;
import java.net.UnknownHostException;

@SpringBootApplication
public class DietAplicationBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DietAplicationBackendApplication.class, args);
	}

	@Bean
	public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
		return factory -> {
			try {
				factory.setAddress(InetAddress.getByName("0.0.0.0")); // Listen on all network interfaces
			} catch (UnknownHostException e) {
				throw new RuntimeException(e);
			}
		};
	}
}
