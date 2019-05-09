package co.kr.real.app.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

import co.kr.real.app.service.ChatService;

@Controller
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private ChatService chatService;
	
	@RequestMapping(value="/hello")
	public String helloSpringBoot() {
		System.out.println("파일 테스트");
		return "hello";
	}
	
	//상대사용자 목록 => 기준은 로그인한 사용자 ID를 대상으로한 관리 대상자
	@RequestMapping(value="/list")
	public String chatList() {
		return "chatList";
	}
	
	//채팅방 목록
	@RequestMapping(value="/roomList")
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
		mv.addObject("roomList", chatService.getRoomList(Criteria.where("member.mid").is("17010504")));
		mv.setViewName("roomList");
		return mv;
	}
	
	@RequestMapping(value="/talk")
	public ModelAndView talk(@RequestParam Map<String,String> params) throws Exception{
		ModelAndView mv = new ModelAndView();
//		Map<String,Object> map = chatService.talkRoomInInfo(params);
		Gson gson = new Gson();
		String strJson = gson.toJson(params, HashMap.class);
		
		mv.addObject("params",params);
		mv.addObject("jsonParams",strJson);
		mv.setViewName("talk");
		return mv;
	}
	
	
	@RequestMapping(value="/talkProcessing")
	@ResponseBody
	public Map<String,Object> talkProcessing(@RequestParam Map<String,String> params) throws Exception{
		Map<String,Object> returnMap = new HashMap<String,Object>();
		Map<String,Object> map = chatService.talkRoomInInfo(params);
		returnMap.put("result", "success");
		returnMap.put("resultData", map);
		return returnMap;
	}
	
}
