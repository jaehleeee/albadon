package com.albadon.albadonapi.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	private final WorkRepository workRepository;

	public List<Work> findWorkList(Store store, Employee employee, Integer year, Integer month) {
		LocalDateTime before = LocalDateTime.of(year, month, 1, 0, 0);
		LocalDateTime now = LocalDateTime.now();

		return workRepository.findByStoreAndEmployeeAndStartDatetimeBetween(store, employee, before, now);
	}

	@Transactional
	public Work saveContractWork(Contract contract, WorkCond workCond, Long workId) {
		Work work = null;

		// workId 여부로 신규 근무이력 생성인지 근무이력 수정인지 판단
		if(Objects.isNull(workId)) {
			work = new Work();
			work.setStore(contract.getStore());
			work.setEmployee(contract.getEmployee());
			work.setWeekday(workCond.getWeekday());
			work.setStartDatetime(workCond.getStartDatetime());
			work.setEndDatetime(workCond.getEndDatetime());
		} else {
			work = workRepository.findById(workId).orElseThrow();
			work.setWeekday(workCond.getWeekday());
			work.setStartDatetime(workCond.getStartDatetime());
			work.setEndDatetime(workCond.getEndDatetime());
		}

		return workRepository.save(work);
	}
}
