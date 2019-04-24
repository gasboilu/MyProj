package co.kr.real;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration(exclude= {DataSourceAutoConfiguration.class})
@ComponentScan(basePackages="co.kr.real.app")
public class NetSocketWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(NetSocketWebApplication.class, args);
	}

}
