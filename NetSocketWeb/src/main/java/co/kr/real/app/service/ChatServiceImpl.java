package co.kr.real.app.service;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.match;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.mongodb.client.result.UpdateResult;

import co.kr.real.app.dto.Member;
import co.kr.real.app.dto.Mng_MsgInfo;
import co.kr.real.app.dto.Mng_RoomInfo;
import co.kr.real.app.mapper.ChatMapper;
import co.kr.real.app.util.CommUtil;

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
	public List<Mng_RoomInfo> getRoomList(Criteria condition) throws Exception {
//		Query query = new Query();
//		query.addCriteria(Criteria.where("from_id").is("17010504"));
//		List<Mng_RoomInfo> roomList = mongoTemplate.find(query, Mng_RoomInfo.class);
		//*******************************************************************************************************
		//mongodb에서 vo클래스로 자동으로 받아오도록 할경우 id값을 사용하지 않는것이 좋다. 인식을 하지못함 기본으로 생성되는 _id값과 혼동되는 듯하다.
		//*******************************************************************************************************
		Aggregation aggregation = newAggregation(match(condition));
		List<Mng_RoomInfo> roomList = mongoTemplate.aggregate(aggregation, "management_roominfo", Mng_RoomInfo.class).getMappedResults();
		
		for(Mng_RoomInfo room : roomList){
			room.setUpd_date(CommUtil.getChatShowDateString(room.getUpd_date(),"yyyyMMddHHmm"));
		}
		return roomList;
	}
	
	/*GroupOperation sumZips = group("state").count().as("zipCount");
	SortOperation sortByCount = sort(Direction.ASC, "zipCount");
	GroupOperation groupFirstAndLast = group().first("_id").as("minZipState")
	  .first("zipCount").as("minZipCount").last("_id").as("maxZipState")
	  .last("zipCount").as("maxZipCount");
	 
	Aggregation aggregation = newAggregation(sumZips, sortByCount, groupFirstAndLast);
	 
	AggregationResults<Document> result = mongoTemplate.aggregate(aggregation, "zips", Document.class);
	Document document= result.getUniqueMappedResult();*/
	
	@Override
	public List<Mng_MsgInfo> getMsgList(int switchCon, Map<String, String> params) throws Exception {
		
		switch (switchCon) {
			case 1:
				break;
			case 2:break;
		}
		return null;
	}

	@Override
	public String setRoomInfoUpdate(int switchCon, Mng_RoomInfo roomInfo) throws Exception {
		String resultChk = "";
		Query query = new Query();
		Update update = new Update();
		
		switch (switchCon){
			//접속한 자기 자신 정보값 등록
			case 1:
				query.addCriteria(Criteria.where("room_id").is(roomInfo.getRoom_id()).and("member.mid").is(roomInfo.getFrom_id()));
				update.set("member.$.room_status", "1");
				break;
			case 2: 
				break;
		}
		
		UpdateResult result = mongoTemplate.updateMulti(query, update, "management_roominfo");
		long failCnt = result.getMatchedCount() - result.getModifiedCount();
		if(failCnt > 0) {
			System.out.println("MatchedCount :: "+ result.getModifiedCount());
			System.out.println("ModifiedCount :: "+ result.getModifiedCount());
			resultChk = "fail";
		}else {
			resultChk = "success";
		}
		return resultChk;
	}
	
	@Override
	public Mng_MsgInfo setMsgInfoUpdate(int switchCon, Mng_MsgInfo msgInfo) throws Exception {
		Query query = new Query();
		Update update = new Update();
		
		switch (switchCon){
			//자기자신의 값은 view값은 1로 변경
			case 1:
				query.addCriteria(Criteria.where("room_id").is(msgInfo.getRoom_id()).and("member.mid").is(msgInfo.getFrom_id()));
				update.set("member.$.view", "1");
				UpdateResult result = mongoTemplate.updateMulti(query, update, "management_msginfo");
				break;
			case 2:
				//2. 총 message_view정보값을 -1하기
				ArrayList<Member> memList = msgInfo.getMember();
				int vCnt = 0;
				for(Member member : memList){
					vCnt += Integer.parseInt(member.getView());
				}
				query = new Query();
				query.addCriteria(Criteria.where("_id").is(msgInfo.get_id()));
				msgInfo = mongoTemplate.findOne(query, Mng_MsgInfo.class);
				msgInfo.setMessage_view(Integer.toString(memList.size()-vCnt));
				msgInfo = mongoTemplate.save(msgInfo);
				break;
		}
		return msgInfo;
	}

	@Override
	public String getRoomCount(Criteria condition) throws Exception {
		Aggregation aggregation = newAggregation(match(condition),group().count().as("totalRoom"));
		Mng_RoomInfo info = mongoTemplate.aggregate(aggregation, "management_roominfo", Mng_RoomInfo.class).getUniqueMappedResult();
		return info.getTotalRoom();
	}

	@Override
	public Map<String, Object> talkRoomInInfo(Map<String,String> params) throws Exception {
		Map<String, Object> mapData = new HashMap<String, Object>();
		String roomId = params.get("room_id");
		Mng_RoomInfo roomInfo = null;
		//신규,기존 체크
		//신규
		if(roomId.length() == 0) {
			roomInfo = roomInfoCombine(params);
			mongoTemplate.insert(roomInfo,"management_roominfo");
			setRoomInfoUpdate(1,roomInfo);
		}else {
			//채팅
			List<Mng_RoomInfo> roomList = getRoomList(Criteria.where("room_id").is(roomId));
			//roomid값을 부여받았지만 해당 채팅방 정보값이 DB에 없는경우 신규로 개설함(이전에 주고받았던 메시지는 사라짐) => 정책필요
			if(roomList.size() == 0){
				//이전이력을 찾을수 없는 메시지 추가
				mapData.put("notFindMsg", "이전이력을 찾을수 없습니다. 채팅방이 신설됩니다.");
				
				roomInfo = roomInfoCombine(params);
				mongoTemplate.insert(roomInfo,"management_roominfo");
				setRoomInfoUpdate(1,roomInfo);
			}else {
				roomInfo = roomList.get(0);
				
				Mng_MsgInfo pMsgInfo = new Mng_MsgInfo();
				pMsgInfo.setRoom_id(roomInfo.getRoom_id());
				pMsgInfo.setFrom_id(roomInfo.getFrom_id());
				setMsgInfoUpdate(1,pMsgInfo);
				
				//기존에 대화내용 정보 검색
				Aggregation aggregation = newAggregation(match(Criteria.where("room_id").is(roomInfo.getRoom_id())));
				List<Mng_MsgInfo> msgList = mongoTemplate.aggregate(aggregation, "management_msginfo", Mng_MsgInfo.class).getMappedResults();
				List<Mng_MsgInfo> newMsgList = new ArrayList<Mng_MsgInfo>();
				for(Mng_MsgInfo msgInfo : msgList) {
					//대화내용 view 갱신
					msgInfo = setMsgInfoUpdate(2,msgInfo);
					msgInfo.setDay(CommUtil.getDateString(msgInfo.getMessage_date(),"yyyyMMddHHmmss","yyyyMMdd"));
					msgInfo.setMessage_day(CommUtil.getDateString(msgInfo.getMessage_date(),"yyyyMMddHHmmss"));
					msgInfo.setMessage_date(CommUtil.getChatShowDateString(msgInfo.getMessage_date(),"yyyyMMddHHmm"));
					newMsgList.add(msgInfo);
				}
				
				mapData.put("msgList", newMsgList);
			}
		}
		
		//채팅정보 => 몽고DB에 채팅방 정보 검색,
		mapData.put("roomInfo", roomInfo);
		return mapData;
	}
	
	private Mng_RoomInfo roomInfoCombine(Map<String,String> params) throws Exception{
		Mng_RoomInfo roomInfo = new Mng_RoomInfo();
		ArrayList<Member> memberList = new ArrayList<Member>();
		Member member = null;
		
		String fromType = params.get("from_type");
		String newRoomId = getNewRoomId(fromType);
		//공통 예외처리 필요
		if(newRoomId.equals("failed")) throw new Exception();
		//채팅방 개설에 필요한정보(기초정보)
		String userId = params.get("user_id");
		String targetId = params.get("target_id");
		String targetName = params.get("target_name");
		String userName = params.get("user_name");
		String roomInId = userId + targetId.replace("|", ",");
		String roomName = userName + targetName.replace("|", ",");
		String toDate = CommUtil.getDateString("yyyyMMddHHmmss");
		String roomInIds[] = roomInId.split(",");
		String roomNames[] = roomName.split(",");
		
		roomInfo.setRoom_id(newRoomId);
		roomInfo.setRoom_name(roomName);
		roomInfo.setRoom_status("0");
		roomInfo.setFrom_id(userId);
		roomInfo.setFrom_name(userName);
		roomInfo.setCreate_date(toDate);
		roomInfo.setUpd_date(toDate);
		
		for(int i=0; i < roomInIds.length ; i++){
			member = new Member();
			if(roomInIds[i].length() > 0) {
				member.setMid(roomInIds[i]);
				member.setName(roomNames[i]);
				//신규생성시 아무도 들어오지 않았다는 가정하에 먼저 생성후에 채팅방 생성자는 입장되있는 상태로 변경
				member.setRoom_add_date(toDate);
				member.setRoom_status("0");
			}
			memberList.add(member);
		}
		roomInfo.setMember(memberList);
		
		return roomInfo;
	}
	
	public String getNewRoomId(String serviceType){
		String type = "";
		String room_id = "";
		try {
			switch (serviceType) {
				case "ITUTOR": type = "ST";break;
				case "SOTONG": type = "PA";break;
				default: type = "ST"; break;
			}
			String today = CommUtil.getDateString("yyyyMMdd");
			int totalCount = Integer.parseInt(getRoomCount(new Criteria()))+1;
			String roomCount = CommUtil.strPad("L",Integer.toString(totalCount),6,"0");
			room_id = today + type + today.substring(2,4) + roomCount;
		}catch(Exception e) {
			e.printStackTrace();
			room_id = "failed";
		}finally {
			if(room_id.length() < 18) {
				room_id = "failed";
			}
		}
		
		return room_id;
	}
	
}

