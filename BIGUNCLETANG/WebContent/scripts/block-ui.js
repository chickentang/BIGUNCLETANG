define([ 'jquery'], function($){
	function BlockUI(){
        this.boundingBox = null;
    }

	BlockUI.prototype = $.extend({}, {
		renderUI: function(){
			this.boundingBox = $('<div  class="ng-scope block-ui">'+
                '<div  class="block-ui-overlay block-ui-visible"></div>'+
                '<div class="block-ui-message-container ">'+
                    '<div class="block-ui-message">'+
                        '<div class="loading-outer">'+
                            '<div class="loading-logo"></div>'+
                           ' <div class="loading-circle"></div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="loading-text ">数据正在加载中</div>'+
               ' </div>'+
            '</div>');
			this.boundingBox.appendTo(document.body);
		},
        render: function(container){
			this.renderUI();
			$(container || document.body).append(this.boundingBox);
		},
		start: function(){
            this.render();
		},
        stop: function(){
			this.boundingBox.off();
			this.boundingBox.remove();
		}
	})
	return {
		BlockUI: BlockUI
	}
})