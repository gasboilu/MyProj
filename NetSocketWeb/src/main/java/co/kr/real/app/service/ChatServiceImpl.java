package co.kr.real.app.service;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import co.kr.real.app.dto.Member;
import co.kr.real.app.dto.Mng_RoomInfo;
import co.kr.real.app.mapper.ChatMapper;

@Service
public class ChatServiceImpl implements ChatService{
	
	@Autowired
	private ChatMapper chatMapper;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Override
	public ArrayList<HashMap<String, Object>> getChatList(HashMap<String, Object> map) throws Exception {
		return chatMapper.getChatList(map);
	}

	@Override
	public List<Mng_RoomInfo> getRoomList() throws Exception {
//		Query query = new Query();
//		query.addCriteria(Criteria.where("from_id").is("17010504"));
//		List<Mng_RoomInfo> roomList = mongoTemplate.find(query, Mng_RoomInfo.class);
		//*******************************************************************************************************
		//mongodb에서 vo클래스로 자동으로 받아오도록 할경우 id값을 사용하지 않는것이 좋다. 인식을 하지못함 기본으로 생성되는 _id값과 혼동되는 듯하다.
		//*******************************************************************************************************
		Aggregation aggregation = newAggregation(match(Criteria.where("member.mid").is("17010504")));
		List<Mng_RoomInfo> roomList = mongoTemplate.aggregate(aggregation, "management_roominfo", Mng_RoomInfo.class).getMappedResults();
		
		//memberList정보가없음
		for(Mng_RoomInfo room : roomList){
			room.setUpd_date(getDateString(room.getUpd_date(),"yyyyMMddHHmm"));
		}
		return roomList;
	}
	
	@Override
	public Map<String, Object> talkRoomInInfo(Map<String,String> params) throws Exception {
		Map<String, Object> mapData = new HashMap<String, Object>();
		String roomId = params.get("room_id");
		System.out.println(roomId.length());
		//신규
		if(roomId.length() == 0) {
			//채팅방 생성
			//접속한 자기 자신 정보값 등록
			//대상 정보값들 등록
		}else {
			//채팅
		}
		//신규,기존 체크
		//채팅정보 => 몽고DB에 채팅방 정보 검색,
		
		
		return mapData;
	}

	public String getDateString(String dateTime, String parttern) throws Exception{
		DateFormat dateFormat = new SimpleDateFormat(parttern);
		Date date = dateFormat.parse(dateTime);
		
		String creTime = "";
		Calendar cal = Calendar.getInstance();
		int to_year = cal.get(Calendar.YEAR);
		int to_month = cal.get(Calendar.MONTH)+1;
		int to_day = cal.get(Calendar.DATE);
		//날짜 문제 24시간으로 안나옴
		
		cal.setTime(date);
//		cal.setTimeInMillis(dateTime);
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		int day = cal.get(Calendar.DATE);
		int hour = cal.get(Calendar.HOUR_OF_DAY);
		int minutes = cal.get(Calendar.MINUTE);
		if(to_year > year) {
			creTime = year + "." + month + "." + day;
		}else {
			if(to_month != month){
				creTime = month + "월 " + day + "일";
			}else {
				if(to_day != day) {
					creTime = month + "월 " + day + "일";
				}else {
					if(hour < 13) {
						creTime += "오전 " + hour;
					} else {
						creTime += "오후 " + (hour - 12);
					}
					if(minutes < 10) {
						creTime += ":0" + minutes;
					}else {
						creTime += ":" + minutes;
					}
				}
				
			}
		}
		
		return creTime;
	}
	
	
}
