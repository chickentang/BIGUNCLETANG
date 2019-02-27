package com.system.service;

import com.system.entities.User;

import org.springframework.stereotype.Service;

/**
 * Created by tang on 2017-01-03.
 */
@Service
public interface UserService {
    User getUser(long id);
    int save(User user);
    int update(User user);
    int delete(User user);
}
