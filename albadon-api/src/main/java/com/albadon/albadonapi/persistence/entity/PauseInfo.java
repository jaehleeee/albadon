package com.albadon.albadonapi.persistence.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class PauseInfo implements Serializable {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HHmm")
	private LocalTime duration;
	// private LocalDateTime startTime;
	// private LocalDateTime endTime;
}
