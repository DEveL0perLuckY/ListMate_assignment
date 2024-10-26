package com.listmate.my_app.myconfig;

// import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.cors.reactive.CorsWebFilter;

import com.listmate.my_app.myfilter.JwtAuthenticationFilter;
import com.listmate.my_app.myservice.UserDetailsServiceImp;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

  @Autowired
  UserDetailsServiceImp userDetailsServiceImp;

  @Autowired
  JwtAuthenticationFilter jwtAuthenticationFilter;

  // @Autowired
  // CustomLogoutHandler logoutHandler;

  // cookies me data store kar token ka
  // and token ka data database me store mat kar
  // then the mail problem is logout of CORS stands for Cross-Origin Resource
  // Sharing.
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(
            req -> req.requestMatchers("/api/login/**", "/api/register/**").permitAll()
                
                .anyRequest().authenticated())
        
        .userDetailsService(userDetailsServiceImp)
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling(
            e -> e.accessDeniedHandler((request, response, accessDeniedException) -> response.setStatus(403))
                .authenticationEntryPoint(new HttpStatusEntryPoint(
                    HttpStatus.UNAUTHORIZED)))
        // .logout(l -> l
        // .logoutUrl("/api/logout")
        // .addLogoutHandler(logoutHandler)
        // .logoutSuccessHandler((request, response,
        // authentication) -> SecurityContextHolder
        // .clearContext())
        // )
        .build();

  }

  // @Bean
  // CorsConfigurationSource corsConfigurationSource() {
  // CorsConfiguration configuration = new CorsConfiguration();
  // // configuration.setAllowedOrigins(Arrays.asList("/api/**"));
  // configuration.setAllowedMethods(Arrays.asList("GET", "POST"));
  // configuration.setAllowCredentials(true);
  // configuration.addAllowedOrigin("http://localhost:3000");
  // configuration.addAllowedHeader("*");
  // configuration.addAllowedMethod("*");

  // UrlBasedCorsConfigurationSource source = new
  // UrlBasedCorsConfigurationSource();
  // source.registerCorsConfiguration("*", configuration);
  // return source;
  // }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    return configuration.getAuthenticationManager();
  }

}
