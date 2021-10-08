package com.albadon.albadonapi.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;

public interface StoreRepository extends JpaRepository<Store, Long> {
	@Query(value = "SELECT c FROM Contract c WHERE c.store.storeId = :storeId")
	List<Employee> findEmployeesByStore(Long storeId);
}
