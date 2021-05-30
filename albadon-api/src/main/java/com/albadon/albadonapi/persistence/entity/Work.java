package com.albadon.albadonapi.persistence.entity;

import java.time.LocalDateTime;

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
public class Work extends BaseEntity {
	@Id @GeneratedValue
	private Long wordId;

	@OneToOne(optional = false)
	@JoinColumn(name="store_id", nullable = false,
		foreignKey = @ForeignKey(name = "contract_store_fk"))
	private Store store;

	@OneToOne(optional = false)
	@JoinColumn(name="employee_id", nullable = false,
		foreignKey = @ForeignKey(name = "contract_employee_fk"))
	private Employee employee;

	@Column
	private String weekDay;

	@Column
	private LocalDateTime startDatetime;

	@Column
	private LocalDateTime endDatetime;
}
