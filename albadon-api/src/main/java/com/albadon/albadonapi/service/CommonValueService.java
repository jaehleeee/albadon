package com.albadon.albadonapi.service;

import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import com.albadon.albadonapi.dto.cond.BossCond;
import com.albadon.albadonapi.dto.cond.CommonValueCond;
import com.albadon.albadonapi.persistence.entity.Boss;
import com.albadon.albadonapi.persistence.entity.CommonValue;
import com.albadon.albadonapi.persistence.repository.BossRepository;
import com.albadon.albadonapi.persistence.repository.CommonValueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommonValueService {
	private final CommonValueRepository commonValueRepository;

	public CommonValue retrieveCommonValue(String codeName) {
		CommonValue commonValue = commonValueRepository.findById(codeName).orElse(null);
		Assert.notNull(commonValue, String.format("commonValue Not found by codeName(%s)", codeName));

		return commonValue;
	}

	@Transactional
	public CommonValue upsertCommonValue(CommonValueCond commonValueCond) {
		CommonValue commonValue = commonValueRepository.findById(commonValueCond.getCodeName()).orElse(null);

		if(Objects.isNull(commonValue)) {
			commonValue = new CommonValue();
			commonValue.setCodeName(commonValueCond.getCodeName());
		}

		commonValue.setValue(commonValueCond.getValue());
		commonValue.setCategory(commonValueCond.getCategory());
		commonValue.setComment(commonValueCond.getComment());

		return commonValueRepository.save(commonValue);
	}
}
