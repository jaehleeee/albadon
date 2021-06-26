package com.albadon.albadonapi.dto;

import lombok.Data;

@Data
public class ErrorResult {
	private Integer code;
	private String message;

	public ErrorResult(Integer code, Throwable e) {
		this.code = code;
		this.message = e.getMessage();
	}
}