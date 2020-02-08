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
		initialize: function () {
			this.getRouter().registerAppRoute();
			this.getCurrentUser();
			
		},
		getCurrentUser: function () {
			var self = this;
			$.ajax({
				url: self.serviceURL + 'api/v1/current_user',
				dataType: "json",
				success: function (data) {
					self.postLogin(data);
					
					//
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					console.log("Before navigate login");
					self.router.navigate("login");
				}
			});
		},
		postLogin: function(data){
			var self = this;
			
			$('body').html(this.layout);
			this.$header = $('body').find(".page-header");
			this.$content = $('body').find(".content-area");
			this.$navbar = $('body').find(".page-navbar");
			this.$toolbox = $('body').find(".tools-area");
			this.nav = new Nav({el: this.$navbar});
			this.notificationView = new NotificationView({el: $('body').find(".page-notification")});
			this.notificationView.render();


			self.currentUser = new Gonrin.User(data);
			var $user = self.$header.find("span.username");
			if(self.currentUser.hasRole("DonViAdmin")){
				self.$header.find("span.username").html("Lãnh đạo đơn vị: "+data.user.name);
			}else if(self.currentUser.hasRole("DonViUser")){
				self.$header.find("span.username").html("Người dùng đơn vị: "+data.user.name);
			}else if(self.currentUser.hasRole("CuaKhauUser")){
				self.$header.find("span.username").html("Người dùng cửa khẩu: "+data.user.name);
			}else{
				self.$header.find("span.username").html(data.name);
			}
			$('body').find(".page-login").empty();
			self.nav.render();
			var currentRoute = self.router.currentRoute();
			
			if((!!currentRoute) && ((currentRoute.route == "login") || (currentRoute.route == "defaultRoute"))){
				self.router.navigate("index");
			}
			if((!!currentRoute) && (currentRoute.route == "index")){
				self.router.refresh();
			}
		},
		
	});
    Backbone.history.start();
});