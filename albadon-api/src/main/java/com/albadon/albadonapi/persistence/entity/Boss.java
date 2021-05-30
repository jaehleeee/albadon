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
public class Boss extends BaseEntity {
	@Id @GeneratedValue
	Long bossId;

	@Column
	String name;

	@Column
	String phoneNumber;
}
