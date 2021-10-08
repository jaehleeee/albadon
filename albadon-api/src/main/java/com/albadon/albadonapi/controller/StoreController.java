package com.albadon.albadonapi.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
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
	public Store 가게_조회(@PathVariable Long storeId) {
		return storeService.retrieveStore(storeId);
	}

	@PostMapping
	public Store 신규가계_등록(@RequestBody @Validated StoreCond storeCond) {
		return storeService.createNewStore(storeCond);
	}

	@PutMapping("{storeId}")
	public void 가게_정보_수정(@PathVariable Long storeId, @RequestBody @Validated StoreCond storeCond) {
		storeService.updateStore(storeId, storeCond);
	}

	@DeleteMapping("/{storeId}")
	public void 가게_삭제(@PathVariable Long storeId) {
		storeService.deleteStore(storeId);
	}

	@GetMapping("/{storeId}/employees")
	public List<EmployeeContractDto> 가게_소속_직원_리스트_조회(@PathVariable Long storeId) {
		return storeService.retrieveEmployeeListInStore(storeId);
	}
}
