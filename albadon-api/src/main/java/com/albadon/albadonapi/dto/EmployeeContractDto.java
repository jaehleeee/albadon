package com.albadon.albadonapi.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
public class EmployeeContractDto {
	private Long contractId;
	private Integer wage;
	private Integer nightWage;
	private Integer holidayWage;
	private LocalDate startDate;
	private LocalDate endDate;

	private Long employeeId;
	private String employeeName;
	private String role;
	private String employeePhoneNumber;
	private String employeeSex;
	private LocalDate employeeBirthday;
}
