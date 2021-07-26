package com.albadon.albadonapi.dto.cond;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
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
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HHmm")
	private LocalTime startTime; // 출근 시간
	@NotNull
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HHmm")
	private LocalTime endTime; // 퇴근 시간
}
