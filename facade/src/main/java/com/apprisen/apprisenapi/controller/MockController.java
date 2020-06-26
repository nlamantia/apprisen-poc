package com.apprisen.apprisenapi.controller;

import com.apprisen.apprisenapi.dto.mock.UpdateUserDto;
import com.apprisen.apprisenapi.dto.mock.UserDto;
import com.apprisen.apprisenapi.entity.User;
import com.apprisen.apprisenapi.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/mock")
public class MockController {

    private UserRepo userRepo;
    private ModelMapper mapper;

    public MockController(UserRepo userRepo) {
        this.userRepo = userRepo;
        this.mapper = new ModelMapper();
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> greeting() {
        return ResponseEntity.ok(userRepo.findAll()
                .stream()
                .map(user -> mapper.map(user, UserDto.class))
                .collect(Collectors.toList()));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> greeting(@PathVariable("id") Integer id) {
        UserDto userDto = userRepo.findById(id)
                .map(user -> mapper.map(user, UserDto.class))
                .orElseThrow(EntityNotFoundException::new);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<UserDto> greeting(@PathVariable("id") Integer id, @RequestBody @Valid UpdateUserDto user) {
        User updatedUser = userRepo.findById(id)
                .map(userEntity -> mapUpdatesToEntity(userEntity, user))
                .orElseThrow(EntityNotFoundException::new);
        return ResponseEntity.ok(mapper.map(userRepo.save(updatedUser), UserDto.class));
    }

    private User mapUpdatesToEntity(User userEntity, UpdateUserDto user) {
        userEntity.setAddress1(user.getAddress1());
        userEntity.setAddress2(user.getAddress2());
        userEntity.setCity(user.getCellPhone());
        userEntity.setLastName(user.getLastName());
        userEntity.setFirstName(user.getFirstName());
        userEntity.setMiddleInitial(user.getMiddleInitial());
        userEntity.setState(user.getState());
        userEntity.setZipCode(user.getZipCode());
        userEntity.setEmail(user.getEmail());
        userEntity.setHomePhone(user.getHomePhone());
        userEntity.setCellPhone(user.getCellPhone());
        userEntity.setWorkPhone(user.getWorkPhone());
        return userEntity;
    }


}
