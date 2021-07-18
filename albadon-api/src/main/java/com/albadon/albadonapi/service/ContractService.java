package com.albadon.albadonapi.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.albadon.albadonapi.dto.cond.ContractDetailCond;
import com.albadon.albadonapi.dto.cond.EmployeeContractCond;
import com.albadon.albadonapi.dto.cond.WorkCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.ContractDetail;
import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.entity.Work;
import com.albadon.albadonapi.persistence.repository.ContractDetailRepository;
import com.albadon.albadonapi.persistence.repository.ContractRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class
ContractService {
	private final ContractRepository contractRepository;
	private final ContractDetailRepository contractDetailRepository;
	private final WorkService workService;
	private final EmployeeService employeeService;

	@Transactional
	public Contract createNewContract(Store store, EmployeeContractCond employeeContractCond) {
		try {
			Employee newEmployee = employeeService.createNewEmployee(employeeContractCond);

			Contract contract = new Contract();
			contract.setStore(store);
			contract.setWage(employeeContractCond.getWage());
			contract.setNightWage(employeeContractCond.getNightWage());
			contract.setHolidayWage(employeeContractCond.getHolidayWage());
			contract.setStartDate(employeeContractCond.getStartDate());
			contract.setEndDate(employeeContractCond.getEndDate());
			contract.setEmployee(newEmployee);

			contract = contractRepository.save(contract);

			if(CollectionUtils.isNotEmpty(employeeContractCond.getContractDetailCondList())) {
				for(ContractDetailCond cond : employeeContractCond.getContractDetailCondList()) {
					ContractDetail detail = new ContractDetail();
					detail.setContract(contract);
					detail.setWeekday(cond.getWeekday());
					detail.setStartTime(cond.getStartTime());
					detail.setEndTime(cond.getEndTime());

					contractDetailRepository.save(detail);
				}
			}

			// TODO contract에는 detail 매핑안해도 될까나?

			return contract;

		} catch (Exception e) {
			log.error("createNewContract(employeeContractCond:{}) - {}", employeeContractCond, e.getStackTrace());
			throw e;
		}
	}

	@Transactional
	public void updateContract(Store store, Long contractId, EmployeeContractCond employeeContractCond) {
		try {
			Contract contract = contractRepository.findByContractId(contractId);
			Assert.notNull(contract, String.format("Contract Not Found by Id({})", contractId));

			Assert.notNull(store, String.format("Store(StoreId:{}) Not Correct In Contract(storeId:{})", store.getStoreId(), contract.getStore().getStoreId()));

			employeeService.updateEmployee(contract.getEmployee(), employeeContractCond);

			contract.setWage(employeeContractCond.getWage());
			contract.setNightWage(employeeContractCond.getNightWage());
			contract.setHolidayWage(employeeContractCond.getHolidayWage());
			contract.setStartDate(employeeContractCond.getStartDate());
			contract.setEndDate(employeeContractCond.getEndDate());

			if(CollectionUtils.isNotEmpty(employeeContractCond.getContractDetailCondList())) {
				List<ContractDetail> contractDetails = new ArrayList<>();

				for(ContractDetailCond cond : employeeContractCond.getContractDetailCondList()) {
					ContractDetail detail = new ContractDetail();
					detail.setContract(contract);
					detail.setWeekday(cond.getWeekday());
					detail.setStartTime(cond.getStartTime());
					detail.setEndTime(cond.getEndTime());

					contractDetailRepository.save(detail);

					contractDetails.add(detail);
				}

				contract.setContractDetailList(contractDetails);
			}

			contract = contractRepository.save(contract);

		} catch (Exception e) {
			log.error("createNewContract(employeeContractCond:{}) - {}", employeeContractCond, e.getStackTrace());
			throw e;
		}
	}

	@Transactional
	public void deleteContract(Long contractId) {
		Contract contract = contractRepository.findByContractId(contractId);
		Assert.notNull(contract, "Contract Not Found - contractId:" + contractId);

		// employee 삭제
		employeeService.deleteEmployee(contract.getEmployee().getEmployeeId());

		// contract 삭제
		contractRepository.deleteById(contractId);
	}

	public List<Contract> findContractListByStore(Long storeId) {
		return contractRepository.findContractByStoreId(storeId);
	}

	public Contract findContract(Long contractId) {
		Contract contract = contractRepository.findById(contractId).orElse(null);
		Assert.notNull(contract, String.format("Contract Not Found by Id({})", contractId));

		return contract;
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
		Assert.notNull(workCond.getWeekday(), "weekday is required");
	}

	public void validateContractAndWork(Contract contract, Long workId) {
		Work work = workService.findById(workId);
		if(Objects.isNull(work)) {
			throw new RuntimeException("validateContractAndWork error - work not found by workId");
		}
		Assert.isTrue(contract.getStore().getStoreId().equals(work.getStore().getStoreId()), "Store is not matching between work and contract");
		Assert.isTrue(contract.getEmployee().getEmployeeId().equals(work.getEmployee().getEmployeeId()), "Employee is not matching between work and contract");
	}


}
