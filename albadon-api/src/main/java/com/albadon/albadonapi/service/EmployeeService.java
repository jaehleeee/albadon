package com.albadon.albadonapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.albadon.albadonapi.dto.cond.EmployeeContractCond;
import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.repository.EmployeeRepository;
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
	public Employee createNewEmployee(EmployeeContractCond employeeContractCond) {
		Employee employee = new Employee();
		employee.setEmployeeBirthday(employeeContractCond.getEmployeeBirthday());
		employee.setEmployeeName(employeeContractCond.getEmployeeName());
		employee.setEmployeePhoneNumber(employeeContractCond.getEmployeePhoneNumber());
		employee.setRole(employeeContractCond.getRole());
		employee.setEmployeeSex(employeeContractCond.getEmployeeSex());

		return employeeRepository.save(employee);
	}

	public void updateEmployee(Employee employee, EmployeeContractCond employeeContractCond) {
		employee.setEmployeeBirthday(employeeContractCond.getEmployeeBirthday());
		employee.setRole(employeeContractCond.getRole());
		employee.setEmployeeName(employeeContractCond.getEmployeeName());
		employee.setEmployeeSex(employeeContractCond.getEmployeeSex());
		employee.setEmployeePhoneNumber(employeeContractCond.getEmployeePhoneNumber());

		employeeRepository.save(employee);
	}

	public void deleteEmployee(Long employeeId) {
		employeeRepository.deleteById(employeeId);
	}
}
