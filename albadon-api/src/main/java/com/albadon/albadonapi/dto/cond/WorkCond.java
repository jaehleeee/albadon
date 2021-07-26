package com.albadon.albadonapi.dto.cond;

import java.time.LocalDate;
import java.time.LocalTime;

import com.albadon.albadonapi.persistence.entity.PauseInfo;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class WorkCond {
	@NotNull
	private Long storeId;
	@NotNull
	private Long contractId;

	private Long workId;

	private Integer weekday;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate workDate; // 출근 시간

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HHmm")
	private LocalTime startTime; // 출근 시간

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HHmm")
	private LocalTime endTime; // 퇴근 시간

	private PauseInfo pauseInfo; // 휴게 시간
}
