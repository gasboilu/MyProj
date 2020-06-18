package co.kr.real.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactController {
	
	@RequestMapping(value="/reactMain")
	public String reactMain() throws Exception{
		return "reactMain";
	}
}
