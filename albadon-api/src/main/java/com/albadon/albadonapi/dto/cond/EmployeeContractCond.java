package com.albadon.albadonapi.dto.cond;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.istack.NotNull;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class EmployeeContractCond {
	@NotNull
	@ApiModelProperty(value = "가게 Id", required = true)
	private Long storeId;

	@NotNull
	@ApiModelProperty(value = "직원명", required = true)
	private String employeeName;

	@NotNull
	@ApiModelProperty(value = "역할 (manager, employee)", required = true)
	private String role;

	@ApiModelProperty(value = "직원 휴대폰 번호")
	private String employeePhoneNumber;

	@ApiModelProperty(value = "성별")
	private String employeeSex;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@ApiModelProperty(value = "직원 생년월일")
	private LocalDate employeeBirthday;

	@NotNull
	@ApiModelProperty(value = "시급", required = true)
	private Integer wage;

	@ApiModelProperty(value = "야간 시급")
	private Integer nightWage;

	@ApiModelProperty(value = "주말 시급")
	private Integer holidayWage;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@ApiModelProperty(value = "입사일")
	private LocalDate startDate;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	@ApiModelProperty(value = "퇴사일")
	private LocalDate endDate;
}
