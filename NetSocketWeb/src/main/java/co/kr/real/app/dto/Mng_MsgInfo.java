package co.kr.real.app.dto;

import java.util.ArrayList;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="management_msginfo")
public class Mng_MsgInfo{
	
	private String _id;
	
	private String room_id;
	
	private String from_id;
	
	private String from_name;
	
	private String message;
	
	private String message_view;
	
	private String message_type;
	
	private String message_date;
	
	private String message_day;
	
	private String day;
	
	private ArrayList<Member> member;

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public String getRoom_id() {
		return room_id;
	}

	public void setRoom_id(String room_id) {
		this.room_id = room_id;
	}

	public String getFrom_id() {
		return from_id;
	}

	public void setFrom_id(String from_id) {
		this.from_id = from_id;
	}

	public String getFrom_name() {
		return from_name;
	}

	public void setFrom_name(String from_name) {
		this.from_name = from_name;
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

	public String getMessage_day() {
		return message_day;
	}

	public void setMessage_day(String message_day) {
		this.message_day = message_day;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public ArrayList<Member> getMember() {
		return member;
	}

	public void setMember(ArrayList<Member> member) {
		this.member = member;
	}
	
}
