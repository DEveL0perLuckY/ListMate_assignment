package com.listmate.my_app.loginController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.listmate.my_app.domain.User;
import com.listmate.my_app.model.LoginReq;
import com.listmate.my_app.myservice.AuthenticationResponse;
import com.listmate.my_app.myservice.AuthenticationService;
import com.listmate.my_app.repos.UserRepository;

@RequestMapping(value = "/api/", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
@RestController
public class AuthenticationController {

    @Autowired
    AuthenticationService authService;
    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody User request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody LoginReq request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
