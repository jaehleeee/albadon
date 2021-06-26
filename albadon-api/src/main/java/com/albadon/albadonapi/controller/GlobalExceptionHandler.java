package com.albadon.albadonapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.albadon.albadonapi.dto.ErrorResult;
import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
	@ExceptionHandler(Exception.class)
	protected ResponseEntity<ErrorResult> handleBindException(Exception e) {
		log.error("handleBindException", e);
		final ErrorResult response = new ErrorResult(500, e);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}
}
