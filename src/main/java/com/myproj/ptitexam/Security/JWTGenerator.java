package com.myproj.ptitexam.Security;

import com.myproj.ptitexam.Security.UserDetailAuth;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTGenerator {
    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpireTime;

    public String generateToken(Authentication authentication){
        UserDetailAuth userPrincipal = (UserDetailAuth) authentication.getPrincipal();
        try {
            String token = Jwts.builder()
                    .setSubject((userPrincipal.getUsername()))
                    .setIssuedAt(new Date())
                    .setExpiration(new Date((new Date()).getTime() + jwtExpireTime))
                    .signWith( SignatureAlgorithm.HS256, jwtSecret)
                    .compact();
            return  token;
        } catch (Exception e){
            throw new RuntimeException("Error");
        }


    }
    public String getUsernameFromJWT(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            throw new AuthenticationCredentialsNotFoundException("Error");
        }
    }
    public boolean isExpiredToken(String token){
        Claims claims =Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getExpiration().before(new Date());
    }
}





