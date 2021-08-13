package com.albadon.albadonapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.albadon.albadonapi.dto.ContractDetailDto;
import com.albadon.albadonapi.dto.cond.ContractDetailCond;
import com.albadon.albadonapi.dto.cond.EmployeeContractCond;
import com.albadon.albadonapi.dto.cond.WorkCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.ContractDetail;
import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
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

			return contractRepository.save(contract);
		} catch (Exception e) {
			log.error("createNewContract(employeeContractCond:{}) - {}", employeeContractCond, e.getStackTrace());
			throw e;
		}
	}

	@Transactional
	public Contract updateContract(Store store, Long contractId, EmployeeContractCond employeeContractCond) {
		try {
			Contract contract = contractRepository.findByContractId(contractId);
			Assert.notNull(contract, String.format("Contract not found by Id(%d)", contractId));

			Assert.notNull(contract.getStore().equals(store)
				, String.format("Requested store(StoreId:%d) not same in Contract store(storeId:%d)", store.getStoreId(), contract.getStore().getStoreId()));

			employeeService.updateEmployee(contract.getEmployee(), employeeContractCond);

			contract.setWage(employeeContractCond.getWage());
			contract.setNightWage(employeeContractCond.getNightWage());
			contract.setHolidayWage(employeeContractCond.getHolidayWage());
			contract.setStartDate(employeeContractCond.getStartDate());
			contract.setEndDate(employeeContractCond.getEndDate());

			return contractRepository.save(contract);

		} catch (Exception e) {
			log.error("createNewContract(employeeContractCond:{}) - {}", employeeContractCond, e.getStackTrace());
			throw e;
		}
	}

	@Transactional
	public void deleteContract(Long contractId) {
		Contract contract = contractRepository.findByContractId(contractId);
		Assert.notNull(contract, "Contract Not Found by contractId:" + contractId);
		Assert.notNull(contract.getEmployee(), "Employee Not Found by contractId:" + contractId);
		Long employeeId = contract.getEmployee().getEmployeeId();

		// contract 삭제
		contractRepository.deleteById(contractId);

		// contract detail 삭제
		contractDetailRepository.deleteByContractId(contractId);

		// employee 삭제
		employeeService.deleteEmployee(employeeId);
	}

	public List<Contract> findContractListByStore(Long storeId) {
		return contractRepository.findContractByStoreId(storeId);
	}

	public Contract findContract(Long contractId) {
		Contract contract = contractRepository.findById(contractId).orElse(null);
		Assert.notNull(contract, String.format("Contract Not Found by Id(%d)", contractId));

		return contract;
	}

	public List<ContractDetail> findContractDetails(Long contractId) {
		Contract contract = findContract(contractId);
		return contractDetailRepository.findByContractId(contract.getContractId());
	}

	public ContractDetail findContractDetail(Long contractDetailId) {
		Optional<ContractDetail> contractDetail = contractDetailRepository.findById(contractDetailId);
		Assert.isTrue(contractDetail.isPresent(), String.format("ContractDetail(id:%s) not found", contractDetailId));

		return contractDetail.get();
	}

	@Transactional
	public ContractDetail createContractDetail(ContractDetailCond cond) {
		Contract contract = contractRepository.findByContractId(cond.getContractId());
		hasSameDayContractDetailAlready(contract, cond);

		ContractDetail newContractDetail = new ContractDetail();
		newContractDetail.setStartTime(cond.getStartTime());
		newContractDetail.setEndTime(cond.getEndTime());
		newContractDetail.setWeekday(cond.getWeekday());
		newContractDetail.setContractId(cond.getContractId());

		return contractDetailRepository.save(newContractDetail);
	}

	@Transactional
	public ContractDetail updateContractDetail(Long contractDetailId, ContractDetailCond cond) {
		ContractDetail originContractDetail = findContractDetail(contractDetailId);
		Assert.isTrue(cond.getContractId().equals(originContractDetail.getContractId())
			, String.format("ContractId can't be modified - origin:%s, request:%s", originContractDetail.getContractId(), cond.getContractId()));

		// 요일(weekday)을 변경하려 한다면, 변경하려는 요일에 이미 스케쥴이 있는지 체크
		if(!originContractDetail.getWeekday().equals(cond.getWeekday())) {
			List<ContractDetail> originContractDetailList = findContractDetails(cond.getContractId());
			for (ContractDetail contractDetail : originContractDetailList) {
				// 변경하려는 weekday에 contractDetail 객체가 있다면 스케쥴이 있다는 의미
				Assert.isTrue(contractDetail.getWeekday().equals(cond.getWeekday())
					, String.format(" modifying weekday(%s) is already scheduled", cond.getWeekday()));
			}
		}

		originContractDetail.setWeekday(cond.getWeekday());
		originContractDetail.setEndTime(cond.getEndTime());
		originContractDetail.setStartTime(cond.getStartTime());

		return contractDetailRepository.save(originContractDetail);
	}

	@Transactional
	public void deleteContractDetail(Long contractDetailId) {
		ContractDetail contractDetail = findContractDetail(contractDetailId);
		contractDetailRepository.delete(contractDetail);
	}

	private void hasSameDayContractDetailAlready(Contract contract, ContractDetailCond cond) {
		for(ContractDetail contractDetail : findContractDetails(contract.getContractId())) {
			Assert.isTrue(!cond.getWeekday().equals(contractDetail.getWeekday())
				, String.format("contract(id:%s) already has detail in same weekday(%s)", cond.getContractId(), cond.getWeekday()));
		}
	}

	public void validateWorkCondByContract(Contract contract, WorkCond workCond) {
		Assert.isTrue(contract.getContractId().equals(workCond.getContractId()), "Contract Id is not matching with contract");
		Assert.notNull(workCond.getWeekday(), "weekday is required");
	}

	public void validateNewEmployeeContractCond(EmployeeContractCond cond) {
		Assert.notNull(cond.getStoreId(), "storeId should not be null in EmployeeContractCond");
		Assert.notNull(cond.getEmployeeName(), "employeeName should not be null in EmployeeContractCond");
		Assert.notNull(cond.getStartDate(), "startDate should not be null in EmployeeContractCond");
		Assert.notNull(cond.getRole(), "role should not be null in EmployeeContractCond");
		Assert.notNull(cond.getWage(), "wage should not be null in EmployeeContractCond");
	}

	public ContractDetailDto toDtoFromContractDetail(ContractDetail contractDetail) {
		return ContractDetailDto.builder()
			.contractId(contractDetail.getContractId())
			.weekday(contractDetail.getWeekday())
			.startTime(contractDetail.getStartTime())
			.endTime(contractDetail.getEndTime())
			.build();
	}
}
