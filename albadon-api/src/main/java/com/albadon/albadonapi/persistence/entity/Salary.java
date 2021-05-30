package com.albadon.albadonapi.persistence.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Salary extends BaseEntity {
	@Id
	@GeneratedValue
	private Long salary_id;

	@Column
	private String type; // 주급 or 월급

	@OneToOne(optional = false)
	@JoinColumn(name="store_id", nullable = false,
		foreignKey = @ForeignKey(name = "contract_store_fk"))
	private Store store;

	@OneToOne(optional = false)
	@JoinColumn(name="employee_id", nullable = false,
		foreignKey = @ForeignKey(name = "contract_employee_fk"))
	private Employee employee;

	@Column
	private LocalDate paidDate; // 급여 지급일

	@Column
	private Long paidSalary; // 지급된 급여액

	@Column
	private LocalDate startDate; // 지급된 급여에 대한 업무 시작일

	@Column
	private LocalDate endDate; // 지급된 급여에 대한 업무 마지막일
}
