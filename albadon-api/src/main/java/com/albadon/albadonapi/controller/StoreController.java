package com.albadon.albadonapi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.dto.EmployeeContractDto;
import com.albadon.albadonapi.dto.cond.EmployeeContractCond;
import com.albadon.albadonapi.dto.cond.StoreCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.service.ContractService;
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

	@GetMapping("/{storeId}")
	public Store retrieveStore(@PathVariable Long storeId) {
		return storeService.retrieveStore(storeId);
	}

	@PostMapping
	public Store createNewStore(@RequestBody StoreCond storeCond) {
		return storeService.createNewStore(storeCond);
	}

	@PutMapping("{storeId}")
	public void updateStore(@PathVariable Long storeId, @RequestBody StoreCond storeCond) {
		storeService.updateStore(storeId, storeCond);
	}

	@DeleteMapping("/{storeId}")
	public void deleteStore(@PathVariable Long storeId) {
		storeService.deleteStore(storeId);
	}

	@GetMapping("/{storeId}/employees")
	public List<EmployeeContractDto> retrieveEmployeeListByStore(@PathVariable Long storeId) {
		return storeService.retrieveEmployeeListInStore(storeId);
	}
}
