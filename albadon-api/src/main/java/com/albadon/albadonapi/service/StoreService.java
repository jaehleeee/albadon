package com.albadon.albadonapi.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.albadon.albadonapi.dto.EmployeeContractDto;
import com.albadon.albadonapi.dto.cond.StoreCond;
import com.albadon.albadonapi.persistence.entity.Boss;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreService {
	private final StoreRepository storeRepository;
	private final BossService bossService;
	private final EmployeeService employeeService;
	private final ContractService contractService;

	public Store retrieveStore(Long storeId) {
		return storeRepository.findById(storeId).orElse(null);
	}

	@Transactional
	public Store createNewStore(StoreCond storeCond) {
		Boss boss = bossService.retrieveBoss(storeCond.getBossId());

		Store store = new Store();
		store.setBoss(boss);
		store.setStoreName(storeCond.getStoreName());
		store.setStoreAddress(storeCond.getStoreAddress());
		store.setStorePhoneNumber(storeCond.getStorePhoneNumber());

		return storeRepository.save(store);
	}

	@Transactional(readOnly = true)
	public List<EmployeeContractDto> retrieveEmployeeListInStore(Long storeId) {
		List<EmployeeContractDto> resultList = new ArrayList<>();

		List<Contract> contracts = contractService.findContractListByStore(storeId);

		// TODO contract 조회해서 employee와 contract 정보를 합쳐서 제공

		for(int i=0; i<contracts.size(); i++) {
			Contract contract = contracts.get(i);
			Employee employee = contract.getEmployee();

			EmployeeContractDto dto = makeEmployeeContractDto(contract, employee);
			resultList.add(dto);
		}

		return resultList;
	}

	private EmployeeContractDto makeEmployeeContractDto(Contract contract, Employee employee) {
		return EmployeeContractDto.builder()
			.contractId(contract.getContractId())
			.wage(contract.getWage())
			.holidayWage(contract.getHolidayWage())
			.nightWage(contract.getNightWage())
			.startDate(contract.getStartDate())
			.endDate(contract.getEndDate())
			.employeeId(employee.getEmployeeId())
			.employeeName(employee.getEmployeeName())
			.role(employee.getRole())
			.employeePhoneNumber(employee.getEmployeePhoneNumber())
			.employeeBirthday(employee.getEmployeeBirthday())
			.build();
	}
}