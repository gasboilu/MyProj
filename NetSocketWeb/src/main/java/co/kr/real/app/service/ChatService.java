package co.kr.real.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import co.kr.real.app.dto.Mng_RoomInfo;

public interface ChatService {
	
	 public ArrayList<HashMap<String,Object>> getChatList(HashMap<String,Object> map) throws Exception;
	 
	 public List<Mng_RoomInfo> getRoomList() throws Exception;
	 
	 public Map<String, Object> talkRoomInInfo(Map<String,String> params) throws Exception;
}
