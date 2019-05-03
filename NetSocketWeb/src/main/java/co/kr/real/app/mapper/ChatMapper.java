package co.kr.real.app.mapper;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ChatMapper {
	
	public String getTime();
	
	public ArrayList<HashMap<String,Object>> getChatList(HashMap<String,Object> map) throws Exception;
	
}
