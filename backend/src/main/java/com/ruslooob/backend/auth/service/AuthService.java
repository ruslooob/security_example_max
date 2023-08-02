package com.ruslooob.backend.auth.service;

import com.ruslooob.backend.auth.AuthRequest;
import com.ruslooob.backend.auth.AuthResponse;
import com.ruslooob.backend.auth.RegisterRequest;
import com.ruslooob.backend.auth.UserRepository;
import com.ruslooob.backend.auth.model.Role;
import com.ruslooob.backend.auth.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .login(request.getLogin())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .middleName(request.getMiddleName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        log.info("user with login {} registered", user.getLogin());

        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));

        var user = repository.findByLogin(request.getLogin())
                .orElseThrow();

        log.info("uses with login {} login", user.getLogin());

        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .role(user.getRole())
                .build();
    }
}
