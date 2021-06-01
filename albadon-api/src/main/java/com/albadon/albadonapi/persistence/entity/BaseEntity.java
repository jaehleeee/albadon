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
	@Column(nullable = false, name = "created_time")
	protected LocalDateTime createdTime;
	@Column(nullable = false, name = "updated_time")
	protected LocalDateTime updatedTime;

	@PrePersist
	public void prePersist() {
		if (this.createdTime == null) {
			this.createdTime = KoreanDateTime.localNow();
		}
		this.updatedTime = KoreanDateTime.localNow();
	}

	@PreUpdate
	public void preUpdate() {
		this.updatedTime = KoreanDateTime.localNow();
	}
}

