package com.albadon.albadonapi.dto.cond;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import javax.validation.constraints.NotNull;
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
	@ApiModelProperty(value = "출근 시간, 패턴:'HH:mm'", required = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private LocalTime startTime;

	@NotNull
	@ApiModelProperty(value = "퇴근 시간, 패턴:'HH:mm'", required = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private LocalTime endTime;
}
