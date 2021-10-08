package com.albadon.albadonapi.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("employee")
@CrossOrigin(origins = "*")
public class EmployeeController {
	private final EmployeeService employeeService;

	@Deprecated
	@GetMapping("/{employeeId}")
	public Employee 직원정보_조회(@PathVariable Long employeeId) {
		return employeeService.retrieveEmployee(employeeId);
	}
}
