package com.listmate.my_app.loginController;

import org.springframework.http.ResponseEntity;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.listmate.my_app.domain.User;
import com.listmate.my_app.model.ProfileDTO;
import com.listmate.my_app.repos.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RequestMapping(value = "/api/", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
@RestController
public class DemoController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> profile(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }
        String token = authHeader.substring(7);
        Optional<User> user = userRepository.findByToken(token);

        return user.map(
                u -> ResponseEntity.ok(new ProfileDTO(u.getUserId(), u.getUsername(), u.getEmail(), u.getRoleId())))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/isTokenValid")
    public ResponseEntity<Boolean> isTokenValid(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(false);
        }
        String token = authHeader.substring(7);
        Optional<User> user = userRepository.findByToken(token);

        return ResponseEntity.ok(user.isPresent());
    }
}
