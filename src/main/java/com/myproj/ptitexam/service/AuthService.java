package com.myproj.ptitexam.service;

import com.myproj.ptitexam.DTO.LoginDTO;
import com.myproj.ptitexam.DTO.LoginResponse;
import com.myproj.ptitexam.DTO.RegisterDTO;
import com.myproj.ptitexam.Security.JWTGenerator;
import com.myproj.ptitexam.Security.UserDetailAuth;
import com.myproj.ptitexam.SendEmail.EmailUtil;
import com.myproj.ptitexam.SendEmail.ResetPasswordTokenUtil;
import com.myproj.ptitexam.dao.ResetPasswordTokenDao;
import com.myproj.ptitexam.dao.RoleDao;
import com.myproj.ptitexam.dao.UserDao;
import com.myproj.ptitexam.model.ResetPasswordToken;
import com.myproj.ptitexam.model.Roles;
import com.myproj.ptitexam.model.User;

import jakarta.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;


@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserDao userDao;
    @Autowired
    RoleDao roleDao;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JWTGenerator jwtGenerator;
    @Autowired
    EmailUtil emailUtil;
    @Autowired
    ResetPasswordTokenUtil resetPasswordTokenUtil;
    @Autowired
    ResetPasswordTokenDao resetPasswordTokenDao;
    @Autowired

    public static final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    public ResponseEntity<?> register(RegisterDTO registerDTO) {
        if(userDao.existsByUsername(registerDTO.getUsername())){
            return new ResponseEntity<String>("Username is taken!",HttpStatus.BAD_REQUEST);
        }
        if(userDao.existsByEmail(registerDTO.getEmail())){
            return new ResponseEntity<String>("Email is taken!",HttpStatus.BAD_REQUEST);
        }
        if(!VALID_EMAIL_ADDRESS_REGEX.matcher(registerDTO.getEmail()).matches())
            return new ResponseEntity<String>("Email is not valid",HttpStatus.BAD_REQUEST);
        Roles roles = roleDao.findByName("USER").orElseThrow(()->new RuntimeException("Role not found"));
        Set<Roles> set = new HashSet<>();

        set.add(roles);
        User newUser = new User();
        newUser.setUsername(registerDTO.getUsername());
        newUser.setPassword(passwordEncoder.encode(registerDTO.getPassword()));
        newUser.setEmail(registerDTO.getEmail());
        newUser.setRoles(set);
        System.out.println(newUser);
        userDao.save(newUser);

        return new ResponseEntity<String> ("Signup success!",HttpStatus.OK);
    }

    public ResponseEntity<?> login(LoginDTO loginDTO){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtGenerator.generateToken(authentication);
        UserDetailAuth userDetails = (UserDetailAuth) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new LoginResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
       // return new ResponseEntity<>("String",HttpStatus.OK);
    }

    public ResponseEntity<String> forgotPassword(String email) {
        if(!userDao.existsByEmail(email)) {
            return new ResponseEntity<>("User not found with this email", HttpStatus.BAD_REQUEST);
        }

        try {
            resetPasswordTokenUtil.generate(email);
            ResetPasswordToken rptoken = resetPasswordTokenDao.findByEmail(email);
            emailUtil.sendSetPasswordEmail(email, rptoken.getToken());
        } catch (MessagingException e) {
            System.out.println(e);
        }
        
        return new ResponseEntity<String> ("Please check your email to set new password to your account",HttpStatus.OK);
    }

    public ResponseEntity<String> setPassword(String email, String newPassword, String token) {
        if(!userDao.existsByEmail(email)) {
            return new ResponseEntity<>("User not found with this email", HttpStatus.BAD_REQUEST);
        } else {
            if(resetPasswordTokenUtil.validate(email, token)) {
                User user = userDao.findByEmail(email);
                user.setPassword(passwordEncoder.encode(newPassword));
                userDao.save(user);

                ResetPasswordToken rptoken = resetPasswordTokenDao.findByEmail(email);
                resetPasswordTokenDao.delete(rptoken);
            } else {
                return new ResponseEntity<>("Token is correct!", HttpStatus.BAD_REQUEST);
            }
        }

        return new ResponseEntity<>("Set new password successfully!", HttpStatus.OK);
    }
}
