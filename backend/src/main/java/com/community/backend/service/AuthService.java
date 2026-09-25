package com.community.backend.service;

import com.community.backend.entity.User;
import com.community.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;

	public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public User registerUser(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}

	public String loginUser(String email, String password) {
		return userRepository.findByEmail(email)
				.filter(user -> passwordEncoder.matches(password, user.getPassword()))
				.map(user -> "Login successful")
				.orElse("Invalid email or password");
	}
}
