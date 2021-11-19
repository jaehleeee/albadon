package com.albadon.albadonapi.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.albadon.albadonapi.dto.cond.CommonValueCond;
import com.albadon.albadonapi.persistence.entity.CommonValue;
import com.albadon.albadonapi.service.CommonValueService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("commonValue")
@CrossOrigin(origins = "*")
public class CommonValueController {
	private final CommonValueService commonValueService;

	@GetMapping("/codeName/{codeName}")
	public CommonValue 공통_정보_조회(@PathVariable String codeName) {
		return commonValueService.retrieveCommonValue(codeName);
	}

	@PostMapping
	public CommonValue 공통_정보_생성_및_수정(@RequestBody @Validated CommonValueCond commonValueCond) {
		return commonValueService.upsertCommonValue(commonValueCond);
	}
}
