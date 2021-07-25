package com.albadon.albadonapi.dto.cond;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class EmployeeContractCond {
	private Long storeId;
	private String employeeName;
	private String role;
	private String employeePhoneNumber;
	private String employeeSex;
	private LocalDate employeeBirthday;
	private Integer wage;
	private Integer nightWage;
	private Integer holidayWage;
	private LocalDate startDate;
	private LocalDate endDate;
	private List<ContractDetailCond> contractDetailCondList;

}
