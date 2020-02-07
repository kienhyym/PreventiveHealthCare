define(function (require) {

    "use strict";
    
    var $           = require('jquery'),
        Gonrin    	= require('gonrin');
    var routedata = require('app/bases/Nav/route');
    var Login		= require('app/bases/LoginView');
    var ReadModelView		= require('app/view/BaiViet/ReadModelView');
    return Gonrin.Router.extend({
        routes: {
        	"index" : "index",
        	"blank" : "blankRoute",
            "login":"login",
            "logout": "logout",
            "change-passwd": "changePasswd",
            "error":"error_page",
            "baiviet/readmodel(/:id)": "readbaiviet",
            "*path":  "defaultRoute"
        },
        index:function(){
        },
        blankRoute:function(){
        	//console.log("blankroute");
        	//this.navigate("index",true);
        },
        defaultRoute:function(){
        	//check storejs session
        	console.log("defaultRoute");
        },
        error_page: function(){
        	var app = this.getApp();
        	if(app.$content){
        		app.$content.html("Error Page");
        	}
        	return;
        },
        login: function(){
        	var app = this.getApp();
            var loginview = new Login({el: $('body')});
            loginview.render();
        },
        logout: function () {
            var self = this;
            $.ajax({
                url: self.getApp().serviceURL + '/api/v1/logout',
                dataType: "json",
                success: function (data) {
                    self.navigate("login");
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    self.getApp().notify(self.getApp().translate("LOGOUT_ERROR"));
                }
            });
        },
        readbaiviet: function(){
        	var readbaiviet = new ReadModelView({el: $("#article")});
        	readbaiviet.render();
        },
        registerAppRoute: function(){
            var self = this;
            $.each(routedata, function(idx, entry){
                var entry_path = _.result(entry,'route');
                self.route(entry_path, entry.collectionName, function(){
                    require([ entry['$ref'] ], function ( View) {
                        var view = new View({el: self.getApp().$content, viewData:entry.viewData});
                        view.render();
                    });
                });
            });
        },
    });

});