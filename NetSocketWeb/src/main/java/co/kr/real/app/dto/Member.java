package co.kr.real.app.dto;

public class Member {
	
	private String mid;
	
	private String name;
	
	private String view;
	
	private String room_status;
	
	private String room_add_date;
	
	private String room_enter_date;
	
	private String room_out_date;

	public String getMid() {
		return mid;
	}

	public void setMid(String mid) {
		this.mid = mid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getView() {
		return view;
	}

	public void setView(String view) {
		this.view = view;
	}

	public String getRoom_status() {
		return room_status;
	}

	public void setRoom_status(String room_status) {
		this.room_status = room_status;
	}

	public String getRoom_add_date() {
		return room_add_date;
	}

	public void setRoom_add_date(String room_add_date) {
		this.room_add_date = room_add_date;
	}

	public String getRoom_enter_date() {
		return room_enter_date;
	}

	public void setRoom_enter_date(String room_enter_date) {
		this.room_enter_date = room_enter_date;
	}

	public String getRoom_out_date() {
		return room_out_date;
	}

	public void setRoom_out_date(String room_out_date) {
		this.room_out_date = room_out_date;
	}
	
}
