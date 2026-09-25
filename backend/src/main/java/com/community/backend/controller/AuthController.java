package com.community.backend.controller;

import com.community.backend.entity.User;
import com.community.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private static final String LOGIN_SUCCESS = "Login successful";

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody User user) {
		authService.registerUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest request) {
		String message = authService.loginUser(request.email(), request.password());
		if (LOGIN_SUCCESS.equals(message)) {
			return ResponseEntity.ok(message);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
	}

	public record LoginRequest(String email, String password) {
	}
}
