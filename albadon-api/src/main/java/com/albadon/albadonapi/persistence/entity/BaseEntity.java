package com.albadon.albadonapi.persistence.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.albadon.albadonapi.util.KoreanDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@MappedSuperclass
public abstract class BaseEntity implements Serializable {
	@Setter
	@Column(nullable = false, name = "created_datetime")
	protected LocalDateTime createdDatetime;
	@Column(nullable = false, name = "updated_datetime")
	protected LocalDateTime updatedDatetime;

	@PrePersist
	public void prePersist() {
		if (this.createdDatetime == null) {
			this.createdDatetime = KoreanDateTime.localNow();
		}
		this.updatedDatetime = KoreanDateTime.localNow();
	}

	@PreUpdate
	public void preUpdate() {
		this.updatedDatetime = KoreanDateTime.localNow();
	}
}

