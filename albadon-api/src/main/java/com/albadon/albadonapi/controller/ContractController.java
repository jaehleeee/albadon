package com.albadon.albadonapi.controller;

import java.util.List;

import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.dto.cond.EmployeeContractCond;
import com.albadon.albadonapi.dto.cond.EmployeeContractUpdateDto;
import com.albadon.albadonapi.dto.cond.WorkCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.ContractDetail;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.entity.Work;
import com.albadon.albadonapi.service.ContractService;
import com.albadon.albadonapi.service.StoreService;
import com.albadon.albadonapi.service.WorkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("contract")
@CrossOrigin(origins = "*")
public class ContractController {
	private final ContractService contractService;
	private final WorkService workService;
	private final StoreService storeService;


	@PostMapping
	public Contract 신규직원계약_생성(@RequestBody EmployeeContractCond employeeContractCond) {
		contractService.validateNewEmployeeContractCond(employeeContractCond);
		Store store = storeService.retrieveStore(employeeContractCond.getStoreId());
		return contractService.createNewContract(store, employeeContractCond);
	}

	@PutMapping("{contractId}")
	public void 직원_및_계약_정보_수정(@PathVariable Long contractId, @RequestBody EmployeeContractCond employeeContractCond) {
		Store store = storeService.retrieveStore(employeeContractCond.getStoreId());
		contractService.updateContract(store, contractId, employeeContractCond);
	}

	@Deprecated
	@PutMapping("list")
	public void 직원_및_계약_정보_리스트_수정(@RequestBody List<EmployeeContractUpdateDto> employeeContractUpdateDtos) {
		for(EmployeeContractUpdateDto dto : employeeContractUpdateDtos) {
			Long contractId = dto.getContractId();
			EmployeeContractCond employeeContractCond = dto.getEmployeeContractCond();

			Store store = storeService.retrieveStore(employeeContractCond.getStoreId());
			contractService.updateContract(store, contractId, employeeContractCond);
		}
	}

	@DeleteMapping("{contractId}")
	public void 직원계약_삭제(@PathVariable Long contractId) {
		contractService.deleteContract(contractId);
	}

	@GetMapping("{contractId}")
	public Contract 직원계약_조회(@PathVariable Long contractId) {
		return contractService.findContract(contractId);
	}

	@GetMapping("{contractId}/contractDetails")
	public List<ContractDetail> 계약근무상세_조회(@PathVariable Long contractId) {
		return contractService.findContractDetails(contractId);
	}

	@GetMapping("{contractId}/work")
	public List<Work> 실근무이력_조회(
		@PathVariable Long contractId,
		@RequestParam(required = false) Integer year,
		@RequestParam(required = false) Integer month) {
		Contract contract = contractService.findContract(contractId);

		return workService.findWorkList(contract.getStore(), contract.getEmployee(), year, month);
	}
}
