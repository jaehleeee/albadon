package com.albadon.albadonapi.persistence.entity;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class ContractDetail extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long contractDetailId;

	@Column
	private Integer weekday; // 출근 요일

	@Column
	private LocalTime startTime; // 출근 시간

	@Column
	private LocalTime endTime; // 퇴근 시간

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="contract_id", foreignKey = @ForeignKey(name = "contract_detail_fk"))
	@JsonBackReference
	private Contract contract;
}
