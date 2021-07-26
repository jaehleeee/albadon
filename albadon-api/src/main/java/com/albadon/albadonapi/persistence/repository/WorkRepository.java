package com.albadon.albadonapi.persistence.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.entity.Work;

public interface WorkRepository extends JpaRepository<Work, Long> {
	List<Work> findByStoreAndEmployeeAndWorkDateBetween(Store store, Employee employee, LocalDate thisMonth,  LocalDate nextMonth);
	List<Work> findByWorkDate(LocalDate workDate);
}
