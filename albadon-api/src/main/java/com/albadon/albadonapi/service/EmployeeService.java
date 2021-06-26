package com.albadon.albadonapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.albadon.albadonapi.dto.cond.EmployeeCond;
import com.albadon.albadonapi.dto.cond.StoreCond;
import com.albadon.albadonapi.persistence.entity.Boss;
import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.repository.EmployeeRepository;
import com.albadon.albadonapi.persistence.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmployeeService {
	private final EmployeeRepository employeeRepository;

	public Employee retrieveEmployee(Long employeeId) {
		return employeeRepository.findById(employeeId).orElse(null);
	}

	@Transactional
	public Employee createNewEmployee(EmployeeCond employeeCond) {
		Employee employee = new Employee();
		employee.setEmployeeBirthday(employeeCond.getEmployeeBirthday());
		employee.setEmployeeName(employeeCond.getEmployeeName());
		employee.setEmployeePhoneNumber(employeeCond.getEmployeePhoneNumber());
		employee.setRole(employeeCond.getRole());
		employee.setEmployeeSex(employeeCond.getEmployeeSex());

		return employeeRepository.save(employee);
	}
}
