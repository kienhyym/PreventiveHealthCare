define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    var tpl                 = require('text!tpl/base/Notification.html');
    var template = tpl;
    
    return Gonrin.View.extend({
    	template : template,
		render: function(){
			var self = this;
			self.hideNofity();
			setTimeout($.proxy(self.getNotify, self), 3000);
			//setInterval($.proxy(self.getNotify, self), 3000);
			return this;
		},
		getNotify: function(){
			//get User...
			//console.log("getNotify");
			var self = this;
			if((self.getApp() != null) && (self.getApp().currentUser != null)){
				var url = null;
				var user = self.getApp().currentUser;
				var donvi_id = user.info.donvi.id;
				var thongke = false;
				
				if((user.hasRole("Admin")) || (user.hasRole("VienAdmin")) || (user.hasRole("VienUser"))){
					thongke = "donvi";
					//url = self.getApp().serviceURL + "/api/notification";
					url = self.getApp().serviceURL + "/api/v1/thongkeguibaocao";
				}else if((user.hasRole("DonViAdmin")) || (user.hasRole("DonViUser"))){
					thongke = "cuakhau";
					url = self.getApp().serviceURL + "/api/v1/thongkeguibaocaocuakhau";
				}
				
				
				if(!!thongke){
					$.ajax({
		       		    //url: url + '?donvi_id='+ donvi_id,
						url: url,
		       		    headers: {
		       		    	'content-type': 'application/json'
		       		    },
		       		    dataType: 'json',
		       		    success: function (data) {
		       		    	var count = 0;
		       		    	$.each(data, function(idx, obj){
		       		    		if(!!idx){
		       		    			count = count + 1;
		       		    		}
		       		    	});
		       		    	var msg = "";
		       		    	var path = "";
		       		    	if (thongke == "donvi"){
		       		    		msg = "Có " + count + " đơn vị chưa nộp báo cáo";
		       		    		path = "thongkeguibaocao";
		       		    	}else if(thongke == "cuakhau"){
		       		    		msg = "Có " + count + " cửa khẩu chưa nộp báo cáo";
		       		    		path = "thongkeguibaocaock";
		       		    	}
		       		    	var link = $('<a>').html(msg);
		       		    	link.attr("href", 'javascript:;');
		       		    	link.unbind("click").bind("click", function(){
		       		    		self.hideNofity();
		       		    		self.getApp().getRouter().navigate(path);
		       		    	})
		       		    	self.showNofity(link);
		       		    	//self.getApp().getRouter().navigate("index");
		       		    },
		       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
		       		    	//self.getApp().notify("Login error");
		       		    	self.hideNofity();
		       		    }
		       		});
				}
				
			}
			
			
			//get notify
			
			//show notify
		},
		showNofity: function(msg){
			var self = this;
			self.$el.html(msg);
			self.$el.show();
		},
		hideNofity: function(){
			var self = this;
			self.$el.empty();
			self.$el.hide();
		}

	});

});