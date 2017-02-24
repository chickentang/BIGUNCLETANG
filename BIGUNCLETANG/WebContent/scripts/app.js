"use strict";

define(['angularAMD', 'window', 'directives', 'jquery', 'ui-bootstrap', 'angular-sanitize', 'angular-ui-router',   'upload','ocLazyLoad','bootstrapf','modernizr','owl','respondf','countTo','easing','magnific','stellar', 'waypoints'], function (angularAMD, w) {

    var app = angular.module("app", ['ngSanitize','ui.bootstrap', 'ui.router',  'commonDirectives',  'ngFileUpload','oc.lazyLoad']);
    
    
    app.config(function ($httpProvider) {
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $httpProvider.defaults.withCredentials = true;
    });

    app.filter("deletePoint", function(){
        return function(str){
            var str = str.slice(0,str.length-1);
            var num = parseInt(+str);
            return num + "%";
        }
    })

    // 设置拦截器
    app.config(['$httpProvider', function($httpProvider) {

        var interceptor = function($q, $rootScope) {
            return {
                "response": function(response) {
                    if (response && response.data && response.data.header && response.data.header.code) {
                        switch (response.data.header.code) {
                            // 对应401未授权的请求
                            case 3:
                                $rootScope
                                    .$broadcast("auth:loginRequired");
                                break;
                        }
                    }

                    return response;
                },
                "responseError": function(rejection) {
                   // console.log("no");
                    //dir(rejection)
                    switch (rejection.status) {
                            // 对应401未授权的请求
                        case 401:
                            $rootScope
                                .$broadcast("auth:loginRequired")
                            break;
                            // 对应403禁止的请求
                        case 403:
                            $rootScope
                                .$broadcast("auth:forbidden")
                            break;
                            // 对应404页面找不到
                        case 404:
                            $rootScope
                                .$broadcast("page:notFound")
                            break;
                            // 对应500服务器错误
                        case 500:
                            $rootScope
                                .$broadcast("server:error")
                            break;
                    }
                    return $q.reject(rejection);
                }
            }
        }

        // 注入拦截器
        $httpProvider.interceptors.push(interceptor);

    }]);

    app.run(["$rootScope", "$state", "$stateParams", "$location", function($rootScope, $state, $stateParams, $location){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        //身份验证事件绑定
        // 对应401未授权的请求
        $rootScope.$on("auth:loginRequired", function() {
            // console.log("auth:loginRequired");
            // 跳转到登录界面
            if ($location.$$path.split("/").join(".")
                    .slice(1) == "access.signin") {
                // 如果当前已经是登录界面则不用继续调整到登录界面
                return false;
            }
            $state.go("access.signin");
        });

        // 对应403禁止的请求
        $rootScope.$on("auth:forbidden", function() {
            // console.log("auth:forbidden");
        });

        // 对应404页面找不到
        $rootScope.$on("page:notFound", function() {
            // console.log("page:notFound");
        });

        // 对应500服务器错误
        $rootScope.$on("server:error", function() {
            // console.log("server:error");
        });

    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state("app", angularAMD.route({
                "abstract": !0,
                url: "/app",
                views: {
                    "": {
                        templateUrl: "views/layout.html"
                    }
                }
            }))
            //首页
             .state("app.home", angularAMD.route({
                url: "/home",
                templateUrl: "views/home/home.html",
                controllerUrl: "views/home/homeCtrl"
            }))
            //相册
             .state("app.photos", angularAMD.route({
                url: "/photos",
                templateUrl: "views/photos/photos.html",
                controllerUrl: "views/photos/photosCtrl"
            }))
            //联系我们
             .state("app.contact", angularAMD.route({
                url: "/contact",
                templateUrl: "views/contact/contact.html",
                controllerUrl: "views/contact/contactCtrl"
            }))
            //博客
            .state("app.blog", angularAMD.route({
                url: "/blog",
                templateUrl: "views/blog/blog.html" ,
                controllerUrl: "views/blog/blogCtrl"
            }))
            
            $urlRouterProvider.otherwise("/app/home");

      }]);
    var indexController = function($scope, $rootScope, $http,$location, $window, $state,$urlRouter) {
        
        $scope.initializeController = function() {
            
        	
        }

    };
        
indexController.$inject = [ '$scope', '$rootScope', '$http','$location', '$window', '$state','$urlRouter' ];
    app.controller("indexController", indexController);
    angularAMD.bootstrap(app);
    return app;
});