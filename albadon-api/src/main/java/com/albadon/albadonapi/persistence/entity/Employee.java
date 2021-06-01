package com.albadon.albadonapi.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Employee extends BaseEntity {
	@Id @GeneratedValue
	private Long employeeId;

	@Column
	private String name;

	@Column
	private String phoneNumber;

	@Column
	private String sex;

	@Column
	private Long age;

	@Column
	private String role;
}
