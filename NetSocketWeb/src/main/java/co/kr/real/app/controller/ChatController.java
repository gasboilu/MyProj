package co.kr.real.app.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import co.kr.real.app.service.ChatService;

@Controller
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	@RequestMapping(value="/hello")
	public String helloSpringBoot() {
		System.out.println("파일 테스트");
		return "hello";
	}
	
	//상대사용자 목록 => 기준은 로그인한 사용자 ID를 대상으로한 관리 대상자
	@RequestMapping(value="/chat/list")
	public String chatList() {
		return "chatList";
	}
	
	//채팅방 목록
	@RequestMapping(value="/chat/roomList")
	public ModelAndView chatingRoomList() throws Exception{
		ModelAndView mv = new ModelAndView();
		HashMap<String, Object> dataMap = new HashMap<String,Object>();
		dataMap.put("stId", "17010504");
		//채팅대상리스트
		ArrayList<HashMap<String,Object>> chatList = chatService.getChatList(dataMap);
		for(HashMap<String,Object> map : chatList) {
			dataMap.put("stName", map.get("ST_NAME"));
		}
		mv.addObject("chatList",chatList);
		mv.addObject("chatInfo",dataMap);
		//채팅방 리스트
		mv.addObject("roomList", chatService.getRoomList());
		mv.setViewName("roomList");
		return mv;
	}
	
	@RequestMapping(value="/chat/talk")
	public ModelAndView talk(@RequestParam Map<String,String> params) throws Exception{
		ModelAndView mv = new ModelAndView();
//		Map<String,Object> map = chatService.talkRoomInInfo(params);
		mv.addObject("params",params);
		mv.setViewName("talk");
		return mv;
	}
	
}
