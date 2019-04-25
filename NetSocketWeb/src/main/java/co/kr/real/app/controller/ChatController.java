package co.kr.real.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ChatController {
	
	@RequestMapping(value="/hello")
	public String helloSpringBoot() {
		System.out.println("파일 테스트");
		return "hello";
	}
	
	@RequestMapping(value="/chat/list")
	public String chatList() {
		return "chatList";
	}
	
	@RequestMapping(value="/chat/talk")
	public ModelAndView talk() {
		ModelAndView mv = new ModelAndView();
		mv.addObject("test","1234");
		mv.setViewName("talk");
		return mv;
	}
	
}
