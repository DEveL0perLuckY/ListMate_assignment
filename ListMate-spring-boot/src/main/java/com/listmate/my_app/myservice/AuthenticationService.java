package com.listmate.my_app.myservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.listmate.my_app.domain.Role;
import com.listmate.my_app.domain.User;
import com.listmate.my_app.model.ConstantsId;
import com.listmate.my_app.model.LoginReq;
import com.listmate.my_app.repos.RoleRepository;
import com.listmate.my_app.repos.UserRepository;

import java.util.Arrays;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class AuthenticationService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtService jwtService;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    public AuthenticationResponse register(User request) {
        try {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                return new AuthenticationResponse(null, "email");
            }

            if (userRepository.findByUserName(request.getUsername()).isPresent()) {
                return new AuthenticationResponse(null, "username");
            }
            Optional<Role> roleUser = roleRepository.findById(ConstantsId.ROLE_USER);

            Set<Role> roles = new HashSet<>();
            if (roleUser.isPresent()) {
                roles.add(roleUser.get());
            } else {
                Role user = new Role();
                user.setId(ConstantsId.ROLE_USER);
                user.setName("ROLE_USER");
                Role admin = new Role();
                admin.setId(ConstantsId.ROLE_ADMIN);
                admin.setName("ROLE_ADMIN");
                roleRepository.saveAll(Arrays.asList(user, admin));
                roles.add(user);
                roles.add(admin);
            }
            User user = new User();
            user.setUserName(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRoleId(roles);
            String jwt = jwtService.generateToken(user);
            user.setToken(jwt);
            userRepository.save(user);
            return new AuthenticationResponse(jwt, "successfull");
        } catch (Exception e) {
            return new AuthenticationResponse(null, "error");

        }
    }

    public AuthenticationResponse authenticate(LoginReq request) {
        try {
            System.out.println("user name :" + request.getUserName());
            System.out.println("user password :" + request.getPassword());
            authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword()));

            User user = userRepository.findByUserName(request.getUserName()).orElseThrow();
            String jwt = jwtService.generateToken(user);

            user.setToken(jwt);
            userRepository.save(user);
            System.out.println(jwt);
            return new AuthenticationResponse(jwt, "successful");
        } catch (Exception e) {
            return new AuthenticationResponse(null, "Invalid");
        }

    }

}
