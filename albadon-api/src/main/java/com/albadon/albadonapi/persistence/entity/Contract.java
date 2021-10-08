package com.albadon.albadonapi.persistence.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long contractId;

	@OneToOne(optional = false)
	@JoinColumn(name="store_id", nullable = false, foreignKey = @ForeignKey(name = "contract_store_fk"))
	private Store store;

	@OneToOne(optional = false)
	@JoinColumn(name="employee_id", nullable = false, foreignKey = @ForeignKey(name = "contract_employee_fk"))
	private Employee employee;

	@Column
	private Integer wage;

	@Column
	private Integer nightWage;

	@Column
	private Integer holidayWage;

	@Column
	private LocalDate startDate;

	@Column
	private LocalDate endDate;

	// @OneToMany(mappedBy = "contract", targetEntity = ContractDetail.class, fetch = FetchType.LAZY)
	// @JsonManagedReference
	// private List<ContractDetail> contractDetailList;
}
