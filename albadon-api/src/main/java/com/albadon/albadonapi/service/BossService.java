package com.albadon.albadonapi.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.albadon.albadonapi.dto.cond.BossCond;
import com.albadon.albadonapi.persistence.entity.Boss;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.repository.BossRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BossService {
	private final BossRepository bossRepository;

	public Boss retrieveBoss(Long bossId) {
		return bossRepository.findById(bossId).orElse(null);
	}

	@Transactional
	public Boss createBoss(BossCond bossCond) {
		Boss boss = new Boss();
		boss.setBossName(bossCond.getBossName());
		boss.setBossPhoneNumber(bossCond.getBossPhoneNumber());
		return bossRepository.save(boss);
	}
}
