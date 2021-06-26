package com.albadon.albadonapi.dto.cond;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class StoreCond {
	@NotNull
	private Long bossId;
	@NotNull
	private String storeName;

	private String storeAddress;

	private String storePhoneNumber;
}
