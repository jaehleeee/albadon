package com.albadon.albadonapi.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

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

		return workRepository.findByStoreAndEmployeeIdAndWorkDateBetween(store, employee.getEmployeeId(), thisMonth, nextMonth);
	}

	@Transactional
	public Work createNewWork(WorkCond workCond) {
		Contract contract = contractService.findContract(workCond.getContractId());

		contractService.validateWorkCondByContract(contract, workCond);

		// 해당 날짜에 근무 이력이 이미 있는지 체크
		Work work = workRepository.findByEmployeeIdAndWorkDate(contract.getEmployee().getEmployeeId(), workCond.getWorkDate());
		Assert.isNull(work, String.format("해당 날짜(%s)에 이미 근무 이력이 있습니다.", workCond.getWorkDate()));

		Work newWork = new Work();
		newWork.setStore(contract.getStore());
		newWork.setEmployeeId(contract.getEmployee().getEmployeeId());
		newWork.setWeekday(workCond.getWeekday());
		newWork.setStartTime(workCond.getStartTime());
		newWork.setEndTime(workCond.getEndTime());
		newWork.setWorkDate(workCond.getWorkDate());
		newWork.setPauseInfo(workCond.getPauseInfo());

		return workRepository.save(newWork);
	}

	@Transactional
	public void updateContractWork(Long workId, WorkCond workCond) {
		Optional<Work> work = workRepository.findById(workId);
		Assert.isTrue(work.isPresent(), "Work not found by id:" + workId);

		Work updatingWork = work.get();

		updatingWork.setStartTime(workCond.getStartTime());
		updatingWork.setEndTime(workCond.getEndTime());

		workRepository.save(updatingWork);
	}

	@Transactional
	public void deleteWork(Long workId) {
		workRepository.deleteById(workId);
	}
}
