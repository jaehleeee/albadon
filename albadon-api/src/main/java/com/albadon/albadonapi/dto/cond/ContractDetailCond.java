package com.albadon.albadonapi.dto.cond;

import java.time.LocalTime;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class ContractDetailCond {
	@NotNull
	private Integer weekday; // 출근 요일
	@NotNull
	private LocalTime startTime; // 출근 시간
	@NotNull
	private LocalTime endTime; // 퇴근 시간
}
