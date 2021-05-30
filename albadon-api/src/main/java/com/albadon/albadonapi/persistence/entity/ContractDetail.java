package com.albadon.albadonapi.persistence.entity;

import java.sql.Timestamp;
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
public class ContractDetail extends BaseEntity {
	@Id @GeneratedValue
	private Long contractDetailId;

	@OneToOne(optional = false)
	@JoinColumn(name="contract_id", nullable = false,
		foreignKey = @ForeignKey(name = "contract_detail_fk"))
	private Contract  contract;

	@Column
	private LocalDateTime startDate; // 출근 시작일

	@Column
	private LocalDateTime endDate; // 퇴직일

	@Column
	private String weekday; // 요일

	@Column
	private Timestamp startTime; // 해당 요일 출근 시간

	@Column
	private Timestamp endTime; // 해당 요일 퇴근 시간
}
