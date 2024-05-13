package com.myproj.ptitexam.service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.myproj.ptitexam.DTO.ExamResultDTO;
import com.myproj.ptitexam.DTO.addUserRequest;
import com.myproj.ptitexam.dao.ExamResultDao;
import com.myproj.ptitexam.dao.ResultDetailDao;
import com.myproj.ptitexam.model.ExamResult;
import com.myproj.ptitexam.model.ExamResultDetail;
import com.myproj.ptitexam.model.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.myproj.ptitexam.dao.UserDao;
import com.myproj.ptitexam.model.User;

@Service
public class UserService {
    @Autowired
    UserDao userDao;

    @Autowired
    ExamResultDao examResultDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ResultDetailDao resultDetailDao;

    public ResponseEntity<?> getUserResult(int user_id) {
        try{
            User user = userDao.findById(user_id).orElseThrow(()-> new Exception("User not found"));
            List<ExamResult> listResult= examResultDao.findByUser(user);
            List<ExamResultDTO> returnList = new ArrayList<>();
            for(ExamResult ex:listResult){
                Timestamp timestamp = ex.getEndTime();
                SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
                String dateString = dateFormat.format(timestamp);
                ExamResultDTO temp = new ExamResultDTO(ex.getId(),ex.getExam().getId(),ex.getUser().getUsername(),ex.getExam().getExamTitle(),ex.getScore(),dateString);
                returnList.add(temp);
            }
            return new ResponseEntity<>(returnList,HttpStatus.OK);
        } catch (Exception e){
            System.out.println(e);
            return  new ResponseEntity<>("User not found!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> addUser(addUserRequest user) {
      try {
        if(userDao.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>("Email already existed!", HttpStatus.BAD_REQUEST);
        }
          if(userDao.existsByUsername(user.getUsername())) {
              return new ResponseEntity<>("Username already existed!", HttpStatus.BAD_REQUEST);
          }
        User newUser = new User();
          newUser.setEmail(user.getEmail());
          newUser.setUsername(user.getUsername());
          newUser.setPassword(passwordEncoder.encode(user.getPassword()));
          newUser.setFullName(user.getFullName());
          String pattern = "yyyy-MM-dd";
          SimpleDateFormat sdf = new SimpleDateFormat(pattern);
          try {
              Date date  = sdf.parse(user.getDob());
              long time = date.getTime();
              newUser.setDob(new Timestamp(time));
          }
          catch (ParseException e){
              System.out.println("error");
          }

          Set<Roles> set = new HashSet<>(user.getRoles());

          newUser.setRoles(set);
          System.out.println(newUser);
        userDao.save(newUser);
        return new ResponseEntity<>("User added!", HttpStatus.CREATED);
      } catch (Exception e) {
          System.out.println(e);
          return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
      }
    }

    public ResponseEntity<Object> login(String email, String password) {
      try {
          User user = userDao.findByEmail(email);
          if (user == null || !user.getPassword().equals(password)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
          }
          Map<String, Object> responseData = new HashMap<>();
          responseData.put("message", "Login successfully");
          responseData.put("userId", user.getId());
          responseData.put("userName", user.getUsername());
          return new ResponseEntity<>(responseData, HttpStatus.OK);
      } catch (Exception e) {
          return new ResponseEntity<>("Login failed", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    public ResponseEntity<?> getAllUser() {
        try {
          List<User> list_user = userDao.findAll();
          if(list_user.isEmpty()) {
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
          }
          return new ResponseEntity<>(list_user, HttpStatus.OK);
        } catch(Exception e) {
          return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<User>> getByUsernameContaining(String username) {
      try {
        List<User> list_user = userDao.findByUsernameContaining(username);
        if(list_user == null) {
          return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list_user, HttpStatus.OK);
      } catch(Exception e) {
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    public ResponseEntity<String> editUser(Integer userId, addUserRequest updatedUser) {
      try {
        User existingUser = userDao.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setRoles(new HashSet<Roles>(updatedUser.getRoles()));
          existingUser.setFullName(updatedUser.getFullName());
          String pattern = "yyyy-MM-dd";
          SimpleDateFormat sdf = new SimpleDateFormat(pattern);
          try {
              Date date  = sdf.parse(updatedUser.getDob());
              long time = date.getTime();
              existingUser.setDob(new Timestamp(time));
          }
          catch (ParseException e){
              System.out.println("error");
          }
        
        userDao.save(existingUser);
        return new ResponseEntity<>("Update successfully", HttpStatus.OK);
      } catch (IllegalArgumentException e) {
          e.printStackTrace();
          return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
      } catch (Exception e) {
          e.printStackTrace();
          return new ResponseEntity<>("Edit failed", HttpStatus.BAD_REQUEST);
      }
    }

    public ResponseEntity<String> deleteUser(Integer userId) {
        try {
          User delUser = userDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
          List<ExamResult> delExamResults = examResultDao.findByUser(delUser);
          for(ExamResult delExamResult: delExamResults) {
            List<ExamResultDetail> examResultDetails = resultDetailDao.findByExamResult(delExamResult);

            resultDetailDao.deleteAll(examResultDetails);
          }


          userDao.deleteById(userId);
          return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
          return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
          return new ResponseEntity<>("Delete failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
