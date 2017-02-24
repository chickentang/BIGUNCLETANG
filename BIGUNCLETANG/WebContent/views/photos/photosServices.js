define(['app', 'ajaxService'], function (app) {

    app.register.service('photosServices', ['ajaxService', function (ajaxService) {
        
        //获取页面数据
        this.getData = function (info, successFunction, errorFunction) {
            ajaxService.AjaxPost(info, "api/clientShow/data.json", successFunction, errorFunction);
        };

    }]);
});