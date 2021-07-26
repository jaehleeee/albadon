package com.albadon.albadonapi.persistence.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import com.vladmihalcea.hibernate.type.json.JsonStringType;
import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@TypeDefs({
	@TypeDef(name = "json", typeClass = JsonStringType.class)
})
public class Work extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long workId;

	@OneToOne(optional = false)
	@JoinColumn(name="store_id", nullable = false,
		foreignKey = @ForeignKey(name = "contract_store_fk"))
	private Store store;

	@OneToOne(optional = false)
	@JoinColumn(name="employee_id", nullable = false,
		foreignKey = @ForeignKey(name = "contract_employee_fk"))
	private Employee employee;

	@Column
	private Integer weekday; // 근무 요일

	@Column
	private LocalDate workDate; // 출근 날짜

	@Column
	private LocalTime startTime; // 출근 시간

	@Column
	private LocalTime endTime; // 퇴근 시간

	@Type(type = "json")
	@Column(name="pause_info", columnDefinition = "json")
	private PauseInfo pauseInfo; // 휴식시간
}
