define([ 'angular'], function() {


    var commonDirectives = angular.module("commonDirectives", []);
    //tab切换指令
    commonDirectives.directive("tabsNav", function() {
            return {
                restrict: "AEC",
                link: function(scope, element, attrs) {
                    var element = $(element);
                    var content = element.siblings(".tabs-content").children(".tab-inside");
                    var tabs = element.find(".tab-nav");
                    var index = (attrs.activeindex != undefined ? +attrs.activeindex : 0);
                    tabs.eq(index).addClass("active");
                    content.eq(index).show();
                    tabs.click(function() {
                        $(this).addClass("active").siblings().removeClass("active");
                        var indexCurrent = 0;
                        var that = this;
                        $(this).parent().children(".tab-nav").each(function(index, li) {
                            if (this === that) {
                                indexCurrent = index
                            }
                        })
                        content.eq(indexCurrent).show().siblings().hide();
                    });
                }
            }
        })
        
})
