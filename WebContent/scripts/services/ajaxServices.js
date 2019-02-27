
define(['app','blockUI'], function (app,bok) {
       
    app.register.service('ajaxService', ['$http', '$q', function ($http, $q) {
         
        // setting timeout of 1 second to simulate a busy server.
        this.AjaxPost = function (data, route, successFunction, errorFunction) {
            debugger;
            var blockUI = new bok.BlockUI();
            var deferred = $q.defer();
            
            blockUI.start();
            //console.log(data);
            setTimeout(function () {
                $http.post(route, data).success(function (response, status, headers, config) {
                    blockUI.stop();
                    successFunction(response, status);
                    deferred.resolve(response);
                }).error(function (response) {
                    blockUI.stop();
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                    deferred.reject(response);
                });
            }, 300);
            return deferred.promise;
        }

        this.AjaxPostNoBlock = function (data, route, successFunction, errorFunction) {
            setTimeout(function () {
                $http.post(route, data).success(function (response, status, headers, config) {
                    successFunction(response, status);
                }).error(function (response) {
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            }, 300);

        }

        this.AjaxPostWithNoAuthenication = function (data, route, successFunction, errorFunction) {
            var blockUI = new bok.BlockUI();
            blockUI.start();
            setTimeout(function () {
                $http.post(route, data).success(function (response, status, headers, config) {
                    blockUI.stop();
                    successFunction(response, status);
                }).error(function (response) {
                    blockUI.stop();
                    errorFunction(response);
                });
            }, 300);
        }

        this.AjaxGet = function (route, successFunction, errorFunction) {
            var blockUI = new bok.BlockUI();
            blockUI.start();
            debugger;
            setTimeout(function () {
                $http({ method: 'GET', url: route }).success(function (response, status, headers, config) {
                    blockUI.stop();
                    successFunction(response, status);
                }).error(function (response) {
                    blockUI.stop();
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            }, 300);

        }

        this.AjaxGetWithData = function (data, route, successFunction, errorFunction) {
            var blockUI = new bok.BlockUI();
            blockUI.start();
            //data += "&random=" + Math.random() * 100;
            setTimeout(function () {
                $http({ method: 'GET', url: route, params: data }).success(function (response, status, headers, config) {
                    blockUI.stop();
                    if (response.ReturnStatus == true)
                        successFunction(response, status);
                    else {
                        //if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                        errorFunction(response);
                    }
                }).error(function (response) {
                    blockUI.stop();
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            }, 300);
        }


        this.AjaxGetWithNoBlock = function (data, route, successFunction, errorFunction) {
            setTimeout(function () {
                $http({ method: 'GET', url: route, params: data }).success(function (response, status, headers, config) {
                    successFunction(response, status);
                }).error(function (response) {
                    ;
                    if (response.IsAuthenicated == false) { window.location = "/index.html"; }
                    errorFunction(response);
                });
            }, 0);

        }


    } ]);
});


