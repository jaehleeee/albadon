package com.albadon.albadonapi.persistence.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.entity.Work;

public interface WorkRepository extends JpaRepository<Work, Long> {
	List<Work> findByStoreAndEmployee(Store store, Employee employee);

	// @Query("select w from Work w where w.store = :store and w.employee = :employee and w.startDatetime between :before and :now")
	List<Work> findByStoreAndEmployeeAndStartDatetimeBetween(Store store, Employee employee, LocalDateTime before,  LocalDateTime now);
}
