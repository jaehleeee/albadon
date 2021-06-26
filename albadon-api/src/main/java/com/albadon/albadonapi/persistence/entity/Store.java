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
public class Store extends BaseEntity {
	@Id @GeneratedValue
	private Long storeId;

	@Column
	private String storeName;

	@Column
	private String storeAddress;

	@Column
	private String storePhoneNumber;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="boss_id", foreignKey = @ForeignKey(name = "store_boss_fk"))
	@JsonBackReference
	private Boss boss;
}
