package co.kr.real.app.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;

@Configuration
public class MongoConfig{//extends AbstractMongoConfiguration
	
	@Value("${spring.data.mongodb.database}")
	private String database;
	
	@Autowired
	private MongoDbFactory mongoDbFactory;
	
	@Autowired
	private MongoMappingContext mongoMappingContext;
	
	/*@Override
	protected String getDatabaseName() {
		return database;
	}
	
	@Override
	public MongoClient mongoClient() {
//		MongoCredential credential = MongoCredential.createCredential(userName, database, password)
//		return new MongoClient(new ServerAddress("localhost", 27017),Arrays.asList(credential));
		return new MongoClient(new ServerAddress("localhost", 27017));
	}*/
	
	@Bean
	public MongoTemplate mongoTemplate() throws Exception{
		DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDbFactory);
		MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
		converter.setTypeMapper(new DefaultMongoTypeMapper(null));
		
		return new MongoTemplate(mongoDbFactory,converter);
//		return new MongoTemplate(mongoClient(),database);
	}
	
}
