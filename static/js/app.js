define('jquery', [], function() {
    return jQuery;
});

require.config({
    baseUrl: static_url + '/js/lib',
    paths: {
        app: '../app',
        tpl: '../tpl',
        vendor: '../../vendor'
    },
    /*map: {
        '*': {
            'app/models/employee': 'app/models/memory/employee'
        }
    },*/
    shim: {
    	'gonrin': {
            deps: ['underscore', 'jquery', 'backbone'],
            exports: 'Gonrin'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['jquery', 'gonrin', 'app/router', 'app/bases/Nav/NavbarView', 'app/view/Base/NotificationView', 'text!tpl/base/layout.html', 'i18n!app/nls/app'], function ($, Gonrin, Router, Nav,NotificationView, layout, lang) {
	var app = new Gonrin.Application({
		router: new Router(),
		lang: lang,
		layout: layout,
		//serviceURL: 'http://localhost1:8062',
		//initialize: function(){
			
		//},
		postLogin: function(){
			var self = this;
			
			$('body').html(this.layout);
			this.$header = $('body').find(".page-header");
			this.$content = $('body').find(".content-area");
			this.$navbar = $('body').find(".page-navbar");
			this.$toolbox = $('body').find(".tools-area");
			this.nav = new Nav({el: this.$navbar});
			this.notificationView = new NotificationView({el: $('body').find(".page-notification")});
			this.notificationView.render();
			
			$.ajax({
				url: '/api/v1/current_user',
       		    dataType:"json",
       		    success: function (data) {
       		    	//self.currentUser = data.user;
					//self.currentUser = new Gonrin.User(data.user);
					self.currentUser = new Gonrin.User(data);
       		    	var $user = self.$header.find("span.username");
       		    	if(self.currentUser.hasRole("DonViAdmin")){
       		    		self.$header.find("span.username").html("Lãnh đạo đơn vị: "+data.user.name);
       		    	}else if(self.currentUser.hasRole("DonViUser")){
       		    		self.$header.find("span.username").html("Người dùng đơn vị: "+data.user.name);
       		    	}else if(self.currentUser.hasRole("CuaKhauUser")){
       		    		self.$header.find("span.username").html("Người dùng cửa khẩu: "+data.user.name);
       		    	}else{
       		    		self.$header.find("span.username").html(data.user.name);
       		    	}
       		    	$('body').find(".page-login").empty();
       		    	self.nav.render();
       		    },
       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
       		    	self.notify("Nav error");
       		    	self.router.navigate("login");
       		    }
       		});
		},
		// parseDate: function (val) {
		// 	var result = null;
		// 	if (val === null || val === undefined || val === "" || val === 0) {
		// 		//				return moment.utc();
		// 		result = null;
		// 	} else {
		// 		var date = null;
		// 		if ($.isNumeric(val) && parseInt(val) > 0) {
		// 			date = new Date(val * 1000);
		// 		} else if (typeof val === "string") {
		// 			date = new Date(val);
		// 		} else {
		// 			result = moment.utc();
		// 		}
		// 		if (date != null && date instanceof Date) {
		// 			result = moment.utc([date.getFullYear(), date.getMonth(), date.getDate()]);
		// 		}
		// 		//				return moment.utc();
		// 		//				console.log("app.parseDate====",result);
		// 		return result;
		// 	}
		// },
	});
    Backbone.history.start();
});