package com.albadon.albadonapi.persistence.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.entity.Work;

public interface WorkRepository extends JpaRepository<Work, Long> {
	List<Work> findByStoreAndEmployeeAndStartDatetimeBetween(Store store, Employee employee, LocalDateTime thisMonth,  LocalDateTime nextMonth);
}
