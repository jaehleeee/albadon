package com.albadon.albadonapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.albadon.albadonapi.dto.ErrorResult;
import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	@ExceptionHandler({MethodArgumentNotValidException.class})
	public ResponseEntity<ErrorResult> handleIllegalArgumentException(Exception e) {
		log.error("MethodArgumentNotValidException: {}", e);
		final ErrorResult response = new ErrorResult(HttpStatus.BAD_REQUEST.value(), e);
		return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResult> handleBindException(Exception e) {
		log.error("handleBindException : {}", e);
		final ErrorResult response = new ErrorResult(HttpStatus.INTERNAL_SERVER_ERROR.value(), e);
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}


}
