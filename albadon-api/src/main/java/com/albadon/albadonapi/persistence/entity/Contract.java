package com.albadon.albadonapi.persistence.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
public class Contract extends BaseEntity {
	@Id @GeneratedValue
	private Long contractId;

	@OneToOne(optional = false)
	@JoinColumn(name="store_id", nullable = false,
		foreignKey = @ForeignKey(name = "contract_store_fk"))
	private Store store;

	@OneToOne(optional = false)
	@JoinColumn(name="employee_id", nullable = false,
		foreignKey = @ForeignKey(name = "contract_employee_fk"))
	private Employee employee;

	@Column
	private String wage;

	@Column
	private String nightWage;

	@Column
	private String holidayWage;
}
