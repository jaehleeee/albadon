package com.albadon.albadonapi.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.persistence.entity.Boss;
import com.albadon.albadonapi.service.BossService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("boss")
public class BossController {
	private final BossService bossService;

	@GetMapping("/{bossId}")
	public Boss getBossById(@PathVariable Long bossId) {
		return bossService.findBossById(bossId);
	}
}
