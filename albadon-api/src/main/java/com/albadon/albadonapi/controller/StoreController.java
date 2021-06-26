package com.albadon.albadonapi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.dto.ContractEmployeeDto;
import com.albadon.albadonapi.dto.cond.EmployeeCond;
import com.albadon.albadonapi.dto.cond.StoreCond;
import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.service.EmployeeService;
import com.albadon.albadonapi.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("store")
@CrossOrigin(origins = "*")
public class StoreController {
	private final StoreService storeService;
	private final EmployeeService employeeService;

	@GetMapping("/{storeId}")
	public Store retrieveStore(@PathVariable Long storeId) {
		return storeService.retrieveStore(storeId);
	}

	@PostMapping
	public Store createNewStore(@RequestBody StoreCond storeCond) {
		return storeService.createNewStore(storeCond);
	}

	@GetMapping("/{storeId}/employees")
	public List<ContractEmployeeDto> retrieveEmployeeListByStore(@PathVariable Long storeId) {
		return storeService.retrieveEmployeeListInStore(storeId);
	}

	@PostMapping("/{storeId}/employee")
	public Employee registerEmployeeInStore(@PathVariable Long storeId, @RequestBody EmployeeCond employeeCond) {
		Store store = storeService.retrieveStore(storeId);
		return storeService.registerNewEmployeeWithContract(storeId, employeeCond);
	}


}
