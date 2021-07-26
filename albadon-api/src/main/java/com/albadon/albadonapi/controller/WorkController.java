package com.albadon.albadonapi.controller;

import java.util.List;
import java.util.Objects;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.dto.cond.WorkCond;
import com.albadon.albadonapi.persistence.entity.Work;
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

	@PostMapping
	@Transactional
	public Work 실근무이력_신규등록(@RequestBody WorkCond workCond) {
		return workService.createNewWork(workCond);
	}

	@PutMapping("{workId}")
	@Transactional
	public void 실근무이력_수정(@PathVariable Long workId, @RequestBody WorkCond workCond) {
		workService.updateContractWork(workId, workCond);
	}

	@DeleteMapping("{workId}")
	@Transactional
	public void 실근무이력_삭제(@PathVariable Long workId) {
		workService.deleteWork(workId);
	}

	@PostMapping("list")
	@Transactional
	public void 실근무이력_리스트_추가_및_수정(@RequestBody List<WorkCond> workConds) {
		for(WorkCond cond : workConds) {
			// workId가 없으면 신규생성, 있으면 업데이트
			if (Objects.isNull(cond.getWorkId())) {
				workService.createNewWork(cond);
			} else {
				workService.updateContractWork(cond.getWorkId(), cond);
			}
		}
	}
}
