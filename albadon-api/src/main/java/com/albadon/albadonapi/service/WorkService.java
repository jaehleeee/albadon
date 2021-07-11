package com.albadon.albadonapi.service;

import java.time.LocalDateTime;
import java.util.Calendar;
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

		LocalDateTime thisMonth = LocalDateTime.of(year, month, 1, 0, 0);
		LocalDateTime nextMonth = LocalDateTime.of(year, month+1, 1, 0, 0);

		return workRepository.findByStoreAndEmployeeAndStartDatetimeBetween(store, employee, thisMonth, nextMonth);
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

			//TODO 근무이력이 1개라면, 동일한 날짜에 근무이력이 생성되지 않도록 할 필요가 있음.

		} else {
			work = workRepository.findById(workId).orElseThrow();
			work.setWeekday(workCond.getWeekday());
			work.setStartDatetime(workCond.getStartDatetime());
			work.setEndDatetime(workCond.getEndDatetime());
		}

		return workRepository.save(work);
	}


	public void deleteWork(Long workId) {
		workRepository.deleteById(workId);
	}
}
