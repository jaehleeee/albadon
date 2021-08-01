package com.albadon.albadonapi.dto.cond;

import java.time.LocalDate;
import java.time.LocalTime;

import com.albadon.albadonapi.persistence.entity.PauseInfo;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class WorkCond {
	@NotNull
	@ApiModelProperty(value = "가게 Id", required = true)
	private Long storeId;

	@NotNull
	@ApiModelProperty(value = "직원계약 Id", required = true)
	private Long contractId;

	@ApiModelProperty(value = "근무 Id")
	private Long workId;

	@NotNull
	@ApiModelProperty(value = "근무 요일", required = true)
	private Integer weekday;

	@NotNull
	@ApiModelProperty(value = "근무 일자", required = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate workDate;

	@NotNull
	@ApiModelProperty(value = "출근 시간", required = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HHmm")
	private LocalTime startTime;

	@ApiModelProperty(value = "퇴근 시간")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HHmm")
	private LocalTime endTime;

	@ApiModelProperty(value = "휴게 시간")
	private PauseInfo pauseInfo;
}
