package co.kr.real.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ChatController {
	
	@RequestMapping(value="/hello")
	public String helloSpringBoot() {
		System.out.println("파일 테스트");
		return "hello";
	}
}
