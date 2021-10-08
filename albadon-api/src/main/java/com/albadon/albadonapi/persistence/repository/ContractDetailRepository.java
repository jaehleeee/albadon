package com.albadon.albadonapi.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.albadon.albadonapi.persistence.entity.ContractDetail;

public interface ContractDetailRepository extends JpaRepository<ContractDetail, Long> {
	List<ContractDetail> findByContractId(Long contractId);
	void deleteByContractId(Long contractId);
}
