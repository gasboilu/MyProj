package co.kr.real.app.configuration;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

@Configuration
public class MongoConfig extends AbstractMongoConfiguration{
	
	@Value("${spring.data.mongodb.database}")
	private String database;
	
	@Override
	protected String getDatabaseName() {
		return database;
	}
	
	@Override
	public MongoClient mongoClient() {
//		MongoCredential credential = MongoCredential.createCredential(userName, database, password)
//		return new MongoClient(new ServerAddress("localhost", 27017),Arrays.asList(credential));
		return new MongoClient(new ServerAddress("localhost", 27017));
	}
	
	@Bean
	public MongoTemplate mongoTemplate() throws Exception{
		return new MongoTemplate(mongoClient(),database);
	}
	
	
	
}
