package com.albadon.albadonapi.dto;

import java.util.List;

import com.albadon.albadonapi.persistence.entity.Work;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude
@JsonIgnoreProperties(ignoreUnknown = true)
public class MonthlyWorkDto {
	private List<WorkDto> monthWork;
	private List<WorkDto> prevMonthLastWeekWork;
}
