define(['widget', 'jquery'], function(widget, $){
	function Window(){
		this.cfg = {
			width: 500,
			height: 300,
			title: "系统消息",
			content: "",
			hasMask: true,
			hasCloseBtn: false,
            autoClose:false,
            setTime:0,
			//isDraggable: true,
			//dragHandle: null,
            confirmBtnClass:"",
			skinClassName: null,
			text4AlertBtn: "确定",
			text4ConfirmBtn: "确定",
			text4CancelBtn: "取消",
			handler4AlertBtn: null,
			handler4CloseBtn: null,
			handler4ConfirmBtn: null,
			handler4CancelBtn: null
		}
	}

	Window.prototype = $.extend({}, new widget.Widget(), {
		renderUI: function(){
			var footerContent = "";
			switch(this.cfg.winType){
				case "alert":
					footerContent = '<input type="button" value="' + this.cfg.text4AlertBtn + '" class="window_alertBtn btn btn-red" />';
					break;
				case "confirm":
					footerContent = '<input type="button" value="' + this.cfg.text4ConfirmBtn + '" class="window_confirmBtn '+this.cfg.confirmBtnClass+' btn " /><input type="button" value="' + this.cfg.text4CancelBtn + '" class="window_cancelBtn btn btn-default" />';
					break;
				default:
					break;
			}
			this.boundingBox = $('<div class="window_boundingBox">' + 
					'<div class="window_body">' + this.cfg.content + '</div>' +
				'</div>');
			if(this.cfg.winType != 'common'){
				this.boundingBox.prepend('<div class="window_header">' + this.cfg.title + '</div>');
				this.boundingBox.append('<div class="window_footer">' + footerContent + '</div>');
			}
			if(this.cfg.hasMask){
				this._mask = $('<div class="window_mask"></div>')
				this._mask.appendTo("body");
			}
			if(this.cfg.hasCloseBtn){
				//<span class="window_closeBtn">X</span>
				this.boundingBox.append('<button type="button" class="window_closeBtn close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>')
			}
			this.boundingBox.appendTo(document.body);
		},
		bindUI: function(){
			var that = this;
            //自动关闭
            if(this.cfg.autoClose){
                var a = setTimeout(cal,this.cfg.setTime);
                function cal(){
                    that.fire("close");
				    that.destroy();
                    clearInterval(a);
                }
            }
			this.boundingBox.delegate(".window_alertBtn", "click", function(){
				that.fire("alert");
				that.destroy();
			}).delegate(".window_closeBtn", "click", function(){
				that.fire("close");
				that.destroy();
			}).delegate(".window_confirmBtn", "click", function(){
				that.fire("confirm");
				that.destroy();
			}).delegate(".window_cancelBtn", "click", function(){
				that.fire("cancel");
				that.destroy();
			});
			if(this.cfg.handler4AlertBtn){
				this.on("alert", this.cfg.handler4AlertBtn)
			}
			if(this.cfg.handler4CloseBtn){
				this.on("close", this.cfg.handler4CloseBtn)
			}
			if(this.cfg.handler4ConfirmBtn){
				this.on("confirm", this.cfg.handler4ConfirmBtn)
			}
			if(this.cfg.handler4CancelBtn){
				this.on("cancel", this.cfg.handler4CancelBtn)
			}
		},
		syncUI: function(){
			this.boundingBox.css({
				width: this.cfg.width + "px",
				height: this.cfg.height + "px",
				//left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + "px",
				marginLeft: -this.cfg.width/2,
				top: (this.cfg.y || ($(window).height() - this.cfg.height)/2) + "px",
			});
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					//console.log("this.cfg.dragHandle:" + this.cfg.dragHandle)
					this.boundingBox.draggable({
						handle: this.cfg.dragHandle
					});
				}else{
					this.boundingBox.draggable({
						
					});
				}
			}
		},
		destructor: function(){
			this._mask && this._mask.remove();
		},
		alert: function(cfg){
			$.extend(this.cfg, cfg, {winType: "alert"});
			this.render();
			return this;
		},
		confirm: function(cfg){
			$.extend(this.cfg, cfg, {winType: "confirm"});
			this.render();
			return this;
		},
		prompt: function(cfg){
			$.extend(this.cfg, cfg, {winType: "prompt"});
			this.render();
			return this;
		},
		common: function(cfg){
			$.extend(this.cfg, cfg, {winType: "common"});
			this.render();
			return this;
		}
	})
	return {
		Window: Window
	}
})