package com.albadon.albadonapi.dto.cond;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class ContractDetailCond {
	@NotNull
	@ApiModelProperty(value = "계약 Id", required = true)
	private Long contractId;

	@NotNull
	@ApiModelProperty(value = "출근 요일", required = true)
	private Integer weekday;

	@NotNull
	@ApiModelProperty(value = "출근 시간", required = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HHmm")
	private LocalTime startTime;

	@NotNull
	@ApiModelProperty(value = "퇴근 시간", required = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HHmm")
	private LocalTime endTime;
}
