package com.albadon.albadonapi.service;

import org.springframework.stereotype.Service;

import com.albadon.albadonapi.persistence.entity.Boss;
import com.albadon.albadonapi.persistence.repository.BossRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BossService {
	private final BossRepository bossRepository;

	public Boss findBossById(Long bossId) {
		return bossRepository.findById(bossId).orElse(null);
	}
}
