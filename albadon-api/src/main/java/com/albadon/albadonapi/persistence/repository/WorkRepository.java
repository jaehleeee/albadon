package com.albadon.albadonapi.persistence.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.entity.Work;

public interface WorkRepository extends JpaRepository<Work, Long> {
	List<Work> findByStoreAndEmployeeIdAndWorkDateBetween(Store store, Long employeeId, LocalDate thisMonth,  LocalDate nextMonth);
	Work findByEmployeeIdAndWorkDate(Long employeeId, LocalDate workDate);
}
