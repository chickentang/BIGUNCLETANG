package com.system.controller;

import com.system.entities.User;
import com.system.service.UserService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;

/**
 * Created by tang on 2017-01-03.
 */
@Controller
public class UserController {
    @Resource
    private UserService userService;
    
    /**
     * @author BIGUNCLETANG
     * @since 2017-02-23
     * @return String[]
     * @return 返回数据不需要跳转视图（Ajax）
     */
    @ResponseBody
    @RequestMapping("/logine")
    public String[] getUser(@RequestParam("id") long id){
    	String a[] = {"dsa","ds"};
        System.out.print(id);
        User u = new User();
        u.setId(id);
        u.setName("xiaoming");
        u.setPwd("123456");
        userService.save(u);
        return a;
    }
    /**
     * @author BIGUNCLETANG
     * @since 2017-02-23
     * @return ModelAndView 
     * @return 返回视图
     */
    @ResponseBody
    @RequestMapping("/hello")
    public ModelAndView toLogin(){
    	ModelAndView mv = new ModelAndView();
        //封装要显示到视图的数据
        mv.addObject("msg","hello myfirst mvc");
        //视图名
        mv.setViewName("login");
        return mv;
    }
    
}
