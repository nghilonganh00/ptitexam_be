package com.myproj.ptitexam.SendEmail;

import java.security.SecureRandom;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.myproj.ptitexam.dao.ResetPasswordTokenDao;
import com.myproj.ptitexam.model.ResetPasswordToken;

@Component
public class ResetPasswordTokenUtil {
    private String ResetPasswordTokenUtil;

    @Autowired
    ResetPasswordTokenDao resetPasswordTokenDao;

    public String generateToken(int length) {
        String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom secureRandom = new SecureRandom();

        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }

    public String generate(String email) {
        Timestamp createdAt = new Timestamp(System.currentTimeMillis());
        String stringToken = generateToken(45);
        if(!resetPasswordTokenDao.existsByEmail(email)) {
            ResetPasswordToken newToken = new ResetPasswordToken();
            newToken.setEmail(email);
            newToken.setToken(stringToken);
            newToken.setCreatedAt(createdAt);
            System.out.println("rptoken: " + newToken.getId());

            resetPasswordTokenDao.save(newToken);
        } 

        ResetPasswordToken token = resetPasswordTokenDao.findByEmail(email);
        token.setToken(stringToken);
        System.out.println("token of user: " + token.getToken());
        token.setCreatedAt(createdAt);
        // System.out.println("token");
        resetPasswordTokenDao.save(token);
        return stringToken;
    }

    public boolean validate(String email, String token) {
        if(!resetPasswordTokenDao.existsByEmail(email)) {
            return false;
        }

        ResetPasswordToken resetPassowordToken = resetPasswordTokenDao.findByEmail(email);
        if(!token.equalsIgnoreCase(resetPassowordToken.getToken())) {
            return false;
        }

        Timestamp now = new Timestamp(System.currentTimeMillis());
        long createAt = resetPassowordToken.getCreatedAt().getTime();
        Long nowTime = now.getTime();
        if(nowTime - createAt < 12000) {
            return false;
        }

        
        return true;
    }
}
