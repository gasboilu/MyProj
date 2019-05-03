package co.kr.real.app.dto;

import java.io.Serializable;
import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="management_msginfo")
public class Mng_MsgInfo implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String room_id;
	
	private String message;
	
	private String message_view;
	
	private String message_type;
	
	private String message_date;
	
	private ArrayList<Member> memberList;

	public String getRoom_id() {
		return room_id;
	}

	public void setRoom_id(String room_id) {
		this.room_id = room_id;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMessage_view() {
		return message_view;
	}

	public void setMessage_view(String message_view) {
		this.message_view = message_view;
	}

	public String getMessage_type() {
		return message_type;
	}

	public void setMessage_type(String message_type) {
		this.message_type = message_type;
	}

	public String getMessage_date() {
		return message_date;
	}

	public void setMessage_date(String message_date) {
		this.message_date = message_date;
	}

	public ArrayList<Member> getMemberList() {
		return memberList;
	}

	public void setMemberList(ArrayList<Member> memberList) {
		this.memberList = memberList;
	}
	
}
