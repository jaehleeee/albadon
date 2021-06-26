package com.albadon.albadonapi.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class HealthCheckController {

	@Value("${spring.application.name}")
	private String applicationName;

	@GetMapping("health/project")
	public String project() {
		return applicationName;
	}
}