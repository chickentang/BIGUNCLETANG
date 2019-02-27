define(['app', 'window', 'jquery','mainf','filters', 'photosServices'], function (app, w, $,mf) {
	//console.dir(app);
	app.register.controller('photosController', ['$location', '$modal', '$filter', '$scope', '$rootScope', '$state', '$interval', '$timeout',  'photosServices', '$window',function ($location, $modal, $filter, $scope, $rootScope, $state, $interval, $timeout, photosServices,$window) {

		$scope.initializeController = function () {
           
			$scope.loaded = false;//初始化未加载过数据，则隐藏内容区
			mf.MyFrame.prototype.init();
		}

	}]);
});

