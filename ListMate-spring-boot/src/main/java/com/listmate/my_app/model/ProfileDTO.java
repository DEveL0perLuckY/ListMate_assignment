package com.listmate.my_app.model;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.listmate.my_app.domain.Role;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProfileDTO {

    private Integer id;
    private String userName;
    private String email;
    private List<String> roles;

    public ProfileDTO(Integer id, String userName, String email, Set<Role> roles) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.roles = roles.stream().map(Role::getName).collect(Collectors.toList());
    }
}
