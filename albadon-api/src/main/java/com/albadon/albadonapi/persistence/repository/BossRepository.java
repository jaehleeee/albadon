package com.albadon.albadonapi.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.albadon.albadonapi.persistence.entity.Boss;

public interface BossRepository extends JpaRepository<Boss, Long> {
}
