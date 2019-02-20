package com.mogikanensoftware.spring.demo.app.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DefaultWebController {

	@GetMapping("/")
	public String defaultPage() {
		return "/welcome";
	}

	@GetMapping("/welcome")
	public String welcome() {
		return "/welcome";
	}

	@GetMapping("/login")
	public String login() {
		return "/login";
	}
}
