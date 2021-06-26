package com.albadon.albadonapi.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.albadon.albadonapi.persistence.entity.Contract;

public interface ContractRepository extends JpaRepository<Contract, Long> {
	@Query(value = "SELECT c FROM Contract c WHERE c.store.storeId = :storeId")
	List<Contract> findContractByStoreId(Long storeId);

	Contract findByContractId(Long contractId);
}
