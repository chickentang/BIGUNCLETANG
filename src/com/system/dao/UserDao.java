package com.system.dao;

import com.system.entities.User;

/**
 * Created by tang on 2017-01-03.
 */
public interface UserDao {
    User getUser(long id);
    int saveUser(User user);
    int updateUser(User user);
    int deleteUser(User user);
}
