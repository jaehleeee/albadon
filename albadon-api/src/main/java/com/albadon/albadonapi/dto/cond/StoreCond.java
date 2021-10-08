package com.albadon.albadonapi.dto.cond;

import javax.validation.constraints.NotNull;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class StoreCond {
	@NotNull
	@ApiModelProperty(value = "사장님 Id", required = true)
	private Long bossId;

	@NotNull
	@ApiModelProperty(value = "가게 이름", required = true)
	private String storeName;

	@ApiModelProperty(value = "가게 주소")
	private String storeAddress;

	@ApiModelProperty(value = "가게 번호")
	private String storePhoneNumber;
}
