package com.albadon.albadonapi.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import org.apache.commons.lang3.exception.ExceptionUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class KoreanDateTime {
	public static ZoneId zoneId() {
		return ZoneId.ofOffset("GMT", ZoneOffset.ofHours(9));
	}

	public static ZoneOffset offset() {
		return ZoneOffset.ofHours(9);
	}

	public static LocalDateTime localNow() {
		return LocalDateTime.now(zoneId());
	}

	public static ZonedDateTime zonedNow() {
		return ZonedDateTime.now(zoneId());
	}

	public static ZonedDateTime toZonedDateTime(LocalDateTime koreanLocal) {
		if (koreanLocal == null)
			return null;
		return ZonedDateTime.ofInstant(koreanLocal.toInstant(offset()), zoneId());
	}

	public static LocalDateTime toLocalDateTime(ZonedDateTime koreanZoned) {
		if (koreanZoned == null)
			return null;
		return LocalDateTime.ofInstant(koreanZoned.toInstant(), zoneId());
	}

	/**
	 * example "1536828290.142" nginx에서 이러 경우에 특수문자 제거해서 처리 필요.
	 * @param strLongVal
	 * @return
	 */
	public static LocalDateTime toZoendDateTime(String strLongVal) {
		try {
			Long longVal = Long.parseLong(strLongVal.replace(".", ""));
			return KoreanDateTime.toZoendDateTime(longVal);
		} catch (Exception e) {
			log.error("{}", ExceptionUtils.getStackTrace(e));
		}

		return localNow();
	}

	public static LocalDateTime toZoendDateTime(Long longVal) {
		try {
			return LocalDateTime.ofInstant(Instant.ofEpochMilli(longVal), KoreanDateTime.zoneId());
		} catch (Exception e) {
		}

		return localNow();
	}

	public static void main(String[] args) throws InterruptedException {
		System.out.println(toZoendDateTime(1544479200848L));
	}
}