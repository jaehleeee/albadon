package com.albadon.albadonapi.controller;

import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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

import com.albadon.albadonapi.dto.ContractDetailDto;
import com.albadon.albadonapi.dto.MonthlyWorkDto;
import com.albadon.albadonapi.dto.WorkDto;
import com.albadon.albadonapi.dto.cond.ContractDetailCond;
import com.albadon.albadonapi.dto.cond.EmployeeContractCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.ContractDetail;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.service.ContractService;
import com.albadon.albadonapi.service.StoreService;
import com.albadon.albadonapi.service.WorkService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("contract")
@CrossOrigin(origins = "*")
@Api("Contract Controller API V1")
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
	public Contract 직원_및_계약_정보_수정(@PathVariable Long contractId, @RequestBody EmployeeContractCond employeeContractCond) {
		Store store = storeService.retrieveStore(employeeContractCond.getStoreId());
		return contractService.updateContract(store, contractId, employeeContractCond);
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
	public List<ContractDetailDto> 계약근무상세_리스트_조회(@PathVariable Long contractId) {
		return contractService.findContractDetails(contractId).stream()
			.map(detail -> contractService.toDtoFromContractDetail(detail))
			.collect(Collectors.toList());
	}

	@GetMapping("{contractId}/work")
	public MonthlyWorkDto 실근무이력_조회(
		@PathVariable Long contractId,
		@RequestParam(required = false) Integer year,
		@RequestParam(required = false) Integer month) {
		Contract contract = contractService.findContract(contractId);

		// year, month 비었으면 현재 연도와 월로 채우기
		year = Objects.isNull(year) ? Calendar.getInstance().get(Calendar.YEAR) : year;
		month = Objects.isNull(month) ? Calendar.getInstance().get(Calendar.MONTH) + 1 : month;

		List<WorkDto> monthWork =  workService.findWorkList(contract.getStore(), contract.getEmployee(), year, month);
		List<WorkDto> prevMonthLastWeekWork = workService.findPrevMonthLastWeekWorkList(contract.getStore(), contract.getEmployee(), year, month);

		return MonthlyWorkDto.builder()
			.monthWork(monthWork)
			.prevMonthLastWeekWork(prevMonthLastWeekWork)
			.build();
	}

	@GetMapping("/detail/{contractDetailId}")
	public ContractDetailDto 계약근무상세_조회(@PathVariable Long contractDetailId) {
		return contractService.toDtoFromContractDetail(contractService.findContractDetail(contractDetailId));
	}

	@PostMapping("/detail")
	public ContractDetailDto 계약근무상세_신규_생성(@RequestBody ContractDetailCond contractDetailCond) {
		return contractService.toDtoFromContractDetail(contractService.createContractDetail(contractDetailCond));
	}

	@PutMapping("/detail/{contractDetailId}")
	public ContractDetailDto 계약근무상세_수정(@PathVariable Long contractDetailId, @RequestBody ContractDetailCond contractDetailCond) {
		return contractService.toDtoFromContractDetail(contractService.updateContractDetail(contractDetailId, contractDetailCond));
	}

	@DeleteMapping("/detail/{contractDetailId}")
	public void 계약근무상세_삭제(@PathVariable Long contractDetailId) {
		contractService.deleteContractDetail(contractDetailId);
	}
}
