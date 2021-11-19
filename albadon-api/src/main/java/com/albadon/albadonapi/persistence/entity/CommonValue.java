package com.albadon.albadonapi.persistence.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
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
public class CommonValue {
	@Id
	String codeName;

	@Column
	String category;

	@Column
	String value;

	@Column
	String comment;
}
