package com.albadon.albadonapi.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.albadon.albadonapi.dto.cond.WorkCond;
import com.albadon.albadonapi.persistence.entity.Contract;
import com.albadon.albadonapi.persistence.entity.Employee;
import com.albadon.albadonapi.persistence.entity.Store;
import com.albadon.albadonapi.persistence.entity.Work;
import com.albadon.albadonapi.persistence.repository.WorkRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkService {
	private final ContractService contractService;
	private final WorkRepository workRepository;

	public Work findById(Long workId) {
		return workRepository.findById(workId).orElse(null);
	}

	public List<Work> findWorkList(Store store, Employee employee, Integer year, Integer month) {
		// year, month 비워져있으면 현재 년도와 월로 채우기
		Calendar cal = Calendar.getInstance();
		if(Objects.isNull(year)) {
			year = cal.get(cal.YEAR);
		}
		if(Objects.isNull(month)) {
			month = cal.get(cal.MONTH) + 1;
		}

		LocalDate thisMonth = LocalDate.of(year, month, 1);
		LocalDate nextMonth = LocalDate.of(year, month+1, 1);

		return workRepository.findByStoreAndEmployeeAndWorkDateBetween(store, employee, thisMonth, nextMonth);
	}

	@Transactional
	public Work createNewWork(WorkCond workCond) {
		Contract contract = contractService.findContract(workCond.getContractId());

		contractService.validateWorkCondByContract(contract, workCond);

		// 해당 날짜에 근무이력이 이미 있는지 체크
		List<Work> workList = workRepository.findByWorkDate(workCond.getWorkDate());
		Assert.isTrue(CollectionUtils.isEmpty(workList), String.format("해당 날짜(%s)에 이미 근무 이력이 있습니다.", workCond.getWorkDate()));

		Work work = new Work();
		work.setStore(contract.getStore());
		work.setEmployee(contract.getEmployee());
		work.setWeekday(workCond.getWeekday());
		work.setStartTime(workCond.getStartTime());
		work.setEndTime(workCond.getEndTime());
		work.setWorkDate(workCond.getWorkDate());
		work.setPauseInfo(workCond.getPauseInfo());

		return workRepository.save(work);
	}

	@Transactional
	public void updateContractWork(Long workId, WorkCond workCond) {
		Work work = workRepository.findById(workId).orElseThrow();
		work.setWeekday(workCond.getWeekday());
		work.setStartTime(workCond.getStartTime());
		work.setEndTime(workCond.getEndTime());

		workRepository.save(work);
	}

	public void deleteWork(Long workId) {
		workRepository.deleteById(workId);
	}
}
