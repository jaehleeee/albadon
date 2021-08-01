package com.albadon.albadonapi.persistence.entity;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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
public class Boss extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long bossId;

	@Column
	String bossName;

	@Column
	String bossPhoneNumber;

	@Column
	String bossSex;

	@Column
	LocalDateTime bossBirthday;

	@OneToMany(mappedBy = "boss", targetEntity = Store.class, fetch = FetchType.LAZY)
	@JsonManagedReference
	private List<Store> storeList;
}
