package com.albadon.albadonapi.dto.cond;

import javax.validation.constraints.NotNull;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class BossCond {
	@NotNull
	@ApiModelProperty(value = "사장님 이름", required = true)
	private String bossName;

	@ApiModelProperty(value = "사장님 휴대폰 번호")
	private String bossPhoneNumber;
}
