package co.kr.real.app.configuration;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@MapperScan("co.kr.real.app.mapper")
@EnableTransactionManagement
public class MyBatisConfig {
	
	@Autowired
	private DataSource dataSource;
	
	@Autowired
    private ApplicationContext applicationContext;
	
	@Bean
	public SqlSessionFactory sqlSessionFactory() throws Exception {
	    SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
	    sessionFactory.setDataSource(dataSource);
	    sessionFactory.setConfigLocation(applicationContext.getResource("classpath:mybatis/sql-map-config.xml"));
	    sessionFactory.setMapperLocations(applicationContext.getResources("classpath:mybatis/mapper/**/*.xml"));
	    return sessionFactory.getObject();
	}
	
	
	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) throws Exception{
		SqlSessionTemplate sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory);
		return sqlSessionTemplate;
	}
	
}
