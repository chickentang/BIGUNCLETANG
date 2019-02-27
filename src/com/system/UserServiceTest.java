package com.system;

import com.common.SpringTestBase;
import com.common.utils.IdWorker;
import com.system.entities.User;
import com.system.service.UserService;

import org.junit.Test;

import javax.annotation.Resource;

/**
 * @author tang
 * @version 1.0
 * @date 2017-01-11.
 */
public class UserServiceTest extends SpringTestBase{
    @Resource
   private UserService  userService;

    @Test
    public void testGetUser(){
        User user = userService.getUser(819479428014411776l);
        if (user==null){
            System.out.print("null");
        }else {
            System.out.println(user.getName());
            System.out.println(user.getPwd());
        }
    }

    @Test
    public void testSave(){
        User user = new User();
        user.setId(IdWorker.getId());
        user.setName("admin");
        user.setPwd("123456");
        System.out.print(userService.save(user));
    }

    @Test
    public void testUpdate(){
        User user = new User();
        user.setId(1l);
        user.setPwd("1234567879");
        System.out.print(userService.update(user));
    }

    @Test
    public void testDelete(){
        User user = new User();
        user.setId(1l);
        System.out.print(userService.delete(user));
    }
}
