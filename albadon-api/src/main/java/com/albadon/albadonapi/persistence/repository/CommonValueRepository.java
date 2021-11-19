package com.albadon.albadonapi.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.albadon.albadonapi.persistence.entity.CommonValue;

public interface CommonValueRepository extends JpaRepository<CommonValue, String> {
}
