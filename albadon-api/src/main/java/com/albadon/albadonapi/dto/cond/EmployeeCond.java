package com.albadon.albadonapi.dto.cond;

import java.time.LocalDateTime;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class EmployeeCond {
	@NotNull
	private String employeeName;

	private String employeePhoneNumber;

	private String employeeSex;

	private LocalDateTime employeeBirthday;

	private String role;
}
