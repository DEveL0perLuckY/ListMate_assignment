package com.listmate.my_app.domain;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Setter
@Getter
@Document
public class Product {

    @Id
    private Integer id;

    @NotNull
    @Size(max = 100)
    private String name;

    private String description;

    @NotNull
    @Digits(integer = 12, fraction = 2)
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal price;

    @Size(max = 50)
    private String category;

    private Integer quantityInStock;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Size(max = 20)
    private String status;

    @Digits(integer = 7, fraction = 2)
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal discount;

    @Digits(integer = 5, fraction = 2)
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal rating;

    @DocumentReference(lazy = true)
    @NotNull
    private User user;

}
