package com.system.service.impl;

import com.system.dao.UserDao;
import com.system.entities.User;
import com.system.service.UserService;

import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author tang
 * @version 1.0
 * @date 2017-01-11.
 */
@Service
public class UserServiceImpl implements UserService{

    @Resource
    private UserDao userDao;

    @Override
    public User getUser(long id) {
        User user = userDao.getUser(id);
        if (user==null){
            return null;
        }else {
            return user;
        }
    }

    @Override
    public int save(User user) {
        return userDao.saveUser(user);
    }

    @Override
    public int update(User user) {
        return userDao.updateUser(user);
    }

    @Override
    public int delete(User user) {
        return userDao.deleteUser(user);
    }
}
