package vse.team.dietapplication_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;

import java.net.InetAddress;
import java.net.UnknownHostException;

/*
 * Třída DietApplicationBackendApplication - je hlávní třída springové back-end aplikace
 * spustí aplikaci běžící na webserveru
 *
 * @author Aleksei Baiukov
 */
@SpringBootApplication
@EntityScan("vse.team.dietapplication_backend.entities") // scanování existujících entit
public class DietApplicationBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DietApplicationBackendApplication.class, args);
	}

	// nastavení webserveru
	@Bean
	public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
		return factory -> {
			try {
				factory.setAddress(InetAddress.getByName("0.0.0.0"));
			} catch (UnknownHostException e) {
				throw new RuntimeException(e);
			}
		};
	}
}
