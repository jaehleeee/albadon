package com.albadon.albadonapi.dto.cond;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class EmployeeContractUpdateDto {
	@NotNull
	private Long contractId;
	@NotNull
	private EmployeeContractCond employeeContractCond;
}
