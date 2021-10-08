package com.albadon.albadonapi.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.albadon.albadonapi.persistence.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
