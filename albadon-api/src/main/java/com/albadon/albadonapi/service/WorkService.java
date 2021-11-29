package com.albadon.albadonapi.service;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.albadon.albadonapi.dto.WorkDto;
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

	public List<WorkDto> findWorkList(Store store, Employee employee, Integer year, Integer month) {
		LocalDate thisMonth = LocalDate.of(year, month, 1);
		LocalDate nextMonth = getNextMonth(year, month);

		List<Work> workList = workRepository.findByStoreAndEmployeeIdAndWorkDateBetween(store, employee.getEmployeeId(), thisMonth, nextMonth);

		return workList.stream()
			.sorted(Comparator.comparing(Work::getWorkDate))
			.map(work -> toDtoFromWork(work))
			.collect(Collectors.toList());
	}

	private LocalDate getNextMonth(Integer year, Integer month) {
		if(month == 12) {
			return LocalDate.of(year+1, 1 , 1);
		}

		return LocalDate.of(year, month+1, 1);
	}

	public List<WorkDto> findPrevMonthLastWeekWorkList(Store store, Employee employee, Integer year, Integer month) {
		if (month == 1) {
			year = year - 1;
			month = 12;
		} else {
			month = month - 1;
		}

		List<WorkDto> lastMonthWork = findWorkList(store, employee, year, month);

		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1); // Calendar에서 현재 달은 month - 1
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DATE));
		int lastWeekNumber  = calendar.get(Calendar.WEEK_OF_MONTH);

		return lastMonthWork.stream()
			.filter(work -> Objects.nonNull(work.getWeekNumber()))
			.filter(work -> work.getWeekNumber() == lastWeekNumber)
			.collect(Collectors.toList());
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
		newWork.setWeekNumber(workCond.getWeekNumber());
		newWork.setWeekday(workCond.getWeekday());
		newWork.setStartTime(workCond.getStartTime());
		newWork.setEndTime(workCond.getEndTime());
		newWork.setWorkDate(workCond.getWorkDate());
		newWork.setPauseInfo(workCond.getPauseInfo());

		return workRepository.save(newWork);
	}

	@Transactional
	public void updateContractWork(Long workId, WorkCond cond) {
		Optional<Work> work = workRepository.findById(workId);
		Assert.isTrue(work.isPresent(), "Work not found by id:" + workId);

		Work updatingWork = work.get();

		updatingWork.setStartTime(cond.getStartTime());
		updatingWork.setEndTime(cond.getEndTime());
		updatingWork.setPauseInfo(cond.getPauseInfo());

		workRepository.save(updatingWork);
	}

	@Transactional
	public void deleteWork(Long workId) {
		workRepository.deleteById(workId);
	}

	public WorkDto toDtoFromWork(Work work) {
		return WorkDto.builder()
			.workId(work.getWorkId())
			.storeId(work.getStore().getStoreId())
			.employeeId(work.getEmployeeId())
			.weekNumber(work.getWeekNumber())
			.weekday(work.getWeekday())
			.startTime(work.getStartTime())
			.endTime(work.getEndTime())
			.pauseInfo(work.getPauseInfo())
			.workDate(work.getWorkDate())
			.build();
	}
}
