package com.albadon.albadonapi.service;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.albadon.albadonapi.dto.cond.WorkCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.ContractDetail;
import com.albadon.albadonapi.persistence.entity.Work;
import com.albadon.albadonapi.persistence.repository.ContractRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class
ContractService {
	private final ContractRepository contractRepository;
	private final WorkService workService;

	public List<Contract> findContractListByStore(Long storeId) {
		return contractRepository.findContractByStoreId(storeId);
	}

	public Contract findContract(Long contractId) {
		return contractRepository.findByContractId(contractId);
	}

	public List<ContractDetail> findContractDetails(Long contractId) {
		Contract contract = contractRepository.findByContractId(contractId);

		if(Objects.nonNull(contract)) {
			return contract.getContractDetailList();
		}

		return Collections.emptyList();
	}

	public void validateWorkCondByContract(Contract contract, WorkCond workCond) {
		Assert.notNull(contract, "contract not found");
		Assert.isTrue(contract.getStore().getStoreId().equals(workCond.getStoreId()), "StoreId is not matching with contract");
		Assert.isTrue(contract.getEmployee().getEmployeeId().equals(workCond.getEmployeeId()), "EmployeeId is not matching with contract");
		Assert.notNull(workCond.getWeekday(), "weekday is required");


	}
}
