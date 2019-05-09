package co.kr.real.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.query.Criteria;

import co.kr.real.app.dto.Mng_MsgInfo;
import co.kr.real.app.dto.Mng_RoomInfo;

public interface ChatService {
	
	 public ArrayList<HashMap<String,Object>> getChatList(HashMap<String,Object> map) throws Exception;
	 
	 //채팅방 정보리스트(조건의따라)
	 public List<Mng_RoomInfo> getRoomList(Criteria condition) throws Exception;
	 
	 //채팅방 메시지 리스트
	 public List<Mng_MsgInfo> getMsgList(int switchCon, Map<String,String> params) throws Exception;
	 
	 //채팅방 현재 갯수
	 public String getRoomCount(Criteria condition) throws Exception;
	 
	 //채팅방 정보 update
	 public String setRoomInfoUpdate(int switchCon, Mng_RoomInfo roomInfo) throws Exception;
	 
	 //채팅방 메시지 update
	 public Mng_MsgInfo setMsgInfoUpdate(int switchCon, Mng_MsgInfo msgInfo) throws Exception;
	 
	 public Map<String, Object> talkRoomInInfo(Map<String,String> params) throws Exception;
}
