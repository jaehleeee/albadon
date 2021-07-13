package com.albadon.albadonapi.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.dto.cond.WorkCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.Work;
import com.albadon.albadonapi.service.ContractService;
import com.albadon.albadonapi.service.WorkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("work")
@CrossOrigin(origins = "*")
public class WorkController {
	private final WorkService workService;
	private final ContractService contractService;

	@PostMapping
	public Work 실근무이력_신규등록(@RequestBody WorkCond workCond) {
		Contract contract = contractService.findContract(workCond.getContractId());

		contractService.validateWorkCondByContract(contract, workCond);
		return workService.saveContractWork(contract, workCond);
	}

	@PutMapping("{workId}")
	public void 실근무이력_수정(
		@PathVariable Long workId,
		@RequestBody WorkCond workCond) {
		workService.updateContractWork(workId, workCond);
	}

	@DeleteMapping("{workId}")
	public void 실근무이력_삭제(@PathVariable Long workId) {
		workService.deleteWork(workId);
	}
}
