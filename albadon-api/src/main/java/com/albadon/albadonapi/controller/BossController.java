package com.albadon.albadonapi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.dto.cond.BossCond;
import com.albadon.albadonapi.persistence.entity.Boss;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.service.BossService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("boss")
@CrossOrigin(origins = "*")
public class BossController {
	private final BossService bossService;

	@GetMapping("/{bossId}")
	public Boss 사장님_조회(@PathVariable Long bossId) {
		return bossService.retrieveBoss(bossId);
	}

	@PostMapping
	public Boss 신규_사장님_생성(@RequestBody BossCond bossCond) {
		return bossService.createBoss(bossCond);
	}

	@GetMapping("/{bossId}/stores")
	public List<Store> 사장님ID로_소속_가게_리스트_조회(@PathVariable Long bossId) {
		Boss boss = bossService.retrieveBoss(bossId);

		return boss.getStoreList();
	}
}
