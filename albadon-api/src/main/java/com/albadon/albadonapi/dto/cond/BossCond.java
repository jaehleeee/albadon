package com.albadon.albadonapi.dto.cond;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class BossCond {
	@NotNull
	private String bossName;

	private String bossPhoneNumber;
}
