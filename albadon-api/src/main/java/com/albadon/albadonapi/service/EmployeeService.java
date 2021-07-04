package com.albadon.albadonapi.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.albadon.albadonapi.dto.cond.EmployeeContractCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmployeeService {
	private final ContractService contractService;
	private final EmployeeRepository employeeRepository;

	public Employee retrieveEmployee(Long employeeId) {
		return employeeRepository.findById(employeeId).orElse(null);
	}

	@Transactional
	public Contract registerNewEmployee(Store store, EmployeeContractCond employeeContractCond) {
		// employee 저장
		Employee newEmployee = createNewEmployee(employeeContractCond);

		// 계약 생성
		Contract newContract = contractService.createNewContract(store, employeeContractCond, newEmployee);

		return newContract;
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


}
