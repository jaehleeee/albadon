package com.albadon.albadonapi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.dto.cond.WorkCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.ContractDetail;
import com.albadon.albadonapi.persistence.entity.Work;
import com.albadon.albadonapi.service.ContractService;
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

	@GetMapping("{contractId}")
	public Contract retrieveContract(@PathVariable Long contractId) {
		return contractService.findContract(contractId);
	}

	@GetMapping("{contractId}/contractDetails")
	public List<ContractDetail> retrieveContractDetail(@PathVariable Long contractId) {
		return contractService.findContractDetails(contractId);
	}

	@GetMapping("{contractId}/work")
	public List<Work> retrieveContractWork(
		@PathVariable Long contractId,
		@RequestParam(required = false) Integer year,
		@RequestParam(required = false) Integer month) {
		Contract contract = contractService.findContract(contractId);

		return workService.findWorkList(contract.getStore(), contract.getEmployee(), year, month);
	}

	@PostMapping("{contractId}/work")
	public Work insertContractEmployeeWork(
		@PathVariable Long contractId,
		@RequestBody WorkCond workCond,
		@RequestParam(required = false) Long workId) {
		Contract contract = contractService.findContract(contractId);

		contractService.validateWorkCondByContract(contract, workCond);
		return workService.saveContractWork(contract, workCond, workId);
	}

	@DeleteMapping("{contractId}/work/{workId}")
	public void deleteContractWork(
		@PathVariable Long contractId, @PathVariable Long workId) {
		Contract contract = contractService.findContract(contractId);
		contractService.validateContractAndWork(contract, workId);

		workService.deleteWork(workId);
	}
}
