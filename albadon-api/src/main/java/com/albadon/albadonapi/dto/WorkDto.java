package com.albadon.albadonapi.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.albadon.albadonapi.persistence.entity.PauseInfo;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude
@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkDto {
	private Long storeId;
	private Long employeeId;
	private Long workId;
	private Integer weekNumber;
	private Integer weekday;
	private LocalDate workDate;
	@JsonFormat(pattern = "HH:mm")
	private LocalTime startTime;
	@JsonFormat(pattern = "HH:mm")
	private LocalTime endTime;
	private PauseInfo pauseInfo;
}
