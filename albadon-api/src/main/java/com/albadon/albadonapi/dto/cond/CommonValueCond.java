package com.albadon.albadonapi.dto.cond;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@EqualsAndHashCode
public class CommonValueCond {

	@NotNull
	@ApiModelProperty(value = "코드명", required = true)
	private String codeName;

	@NotNull
	@ApiModelProperty(value = "코드값", required = true)
	private String value;

	@ApiModelProperty(value = "카테고리")
	private String category;

	@ApiModelProperty(value = "코멘트")
	private String comment;
}
