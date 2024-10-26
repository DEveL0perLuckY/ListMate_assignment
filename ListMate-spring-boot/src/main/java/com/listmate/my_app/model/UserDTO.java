package com.listmate.my_app.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDTO {

    private Integer userId;

    @NotNull
    @Size(max = 50)
    private String userName;

    @Size(max = 255)
    private String email;

    @Size(max = 255)
    private String password;

    private List<Long> roleId;

}
