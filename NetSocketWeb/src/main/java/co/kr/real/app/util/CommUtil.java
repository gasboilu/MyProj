package co.kr.real.app.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class CommUtil {
	
	public static String strPad(String padLocation, String str, int len, String addStr){
		//String.format("%06d", 999);
		String result = "";
		int colLen = len - str.length();
		for(int i=0; i < colLen ; i++){
			result += addStr;
		}
		switch (padLocation) {
			case "R":result = str + result; break;
			case "L":result = result + str; break;
		}
		
		return result;
	}
	
	public static String getDateString(String parttern){
		DateFormat dateFormat = new SimpleDateFormat(parttern);
		return dateFormat.format(System.currentTimeMillis());
	}
	
	public static String getDateString(String dataTime, String parttern, String returnPattern) throws Exception{
		DateFormat dateFormat = new SimpleDateFormat(parttern);
		DateFormat returnFormat = new SimpleDateFormat(returnPattern);
		Date date = dateFormat.parse(dataTime);
		return returnFormat.format(date);
	}
	
	public static String getDateString(String dataTime, String parttern) throws Exception{
		Calendar cal = Calendar.getInstance();
		DateFormat dateFormat = new SimpleDateFormat(parttern);
		Date date = dateFormat.parse(dataTime);
		cal.setTime(date);
		int year = cal.get(Calendar.YEAR);
		int month = cal.get(Calendar.MONTH) + 1;
		int day = cal.get(Calendar.DATE);
		int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);
		String korWeek = "";
		switch (dayOfWeek) {
			case 1:korWeek="일";break;
			case 2:korWeek="월";break;
			case 3:korWeek="화";break;
			case 4:korWeek="수";break;
			case 5:korWeek="목";break;
			case 6:korWeek="금";break;
			case 7:korWeek="토";break;
		}
		return year + "년 " + month + "월 " + day + "일 " + korWeek + "요일";
	}
	
	public static String getChatShowTimeString(String dateTime, String parttern) throws Exception{
		DateFormat dateFormat = new SimpleDateFormat(parttern);
		Date date = dateFormat.parse(dateTime);
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int hour = cal.get(Calendar.HOUR_OF_DAY);
		int minutes = cal.get(Calendar.MINUTE);
		String creTime = "";
		
		if(hour < 13) {
			creTime += "오전" + hour;
		} else {
			creTime += "오후" + (hour - 12);
		}
		if(minutes < 10) {
			creTime += ":0" + minutes;
		}else {
			creTime += ":" + minutes;
		}
		
		return creTime;
	}

	public static String getChatShowDateString(String dateTime, String parttern) throws Exception{
		DateFormat dateFormat = new SimpleDateFormat(parttern);
		Date date = dateFormat.parse(dateTime);
		
		String creTime = "";
		Calendar cal = Calendar.getInstance();
		int to_year = cal.get(Calendar.YEAR);
		int to_month = cal.get(Calendar.MONTH)+1;
		int to_day = cal.get(Calendar.DATE);
		
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
						creTime += "오전" + hour;
					} else {
						creTime += "오후" + (hour - 12);
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
