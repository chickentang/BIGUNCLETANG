define(['app', 'window', 'jquery','filters', 'blogServices'], function (app, w, $) {
	//console.dir(app);
	app.register.controller('blogController', ['$location', '$modal', '$filter', '$scope', '$rootScope', '$state', '$interval', '$timeout',  'blogServices', '$window',function ($location, $modal, $filter, $scope, $rootScope, $state, $interval, $timeout, blogServices,$window) {

		$scope.initializeController = function () {
           
			$scope.loaded = false;//初始化未加载过数据，则隐藏内容区
			
		}

	}]);
});

