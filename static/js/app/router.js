define(function (require) {

    "use strict";
    
    var $           = require('jquery'),
        Gonrin    	= require('gonrin'),
        storejs		= require('store');
    var Login		= require('app/bases/LoginView');
    var ReadModelView		= require('app/view/BaiViet/ReadModelView');
    return Gonrin.Router.extend({
        routes: {
        	//"index" : "index",
        	"blank" : "blankRoute",
            "login":"login",
            "logout": "logout",
            "change-passwd": "changePasswd",
            "error":"error_page",
            "baiviet/readmodel(/:id)": "readbaiviet",
            "*path":  "defaultRoute"
        },
        blankRoute:function(){
        	//console.log("blankroute");
        	//this.navigate("index",true);
        },
        defaultRoute:function(){
        	//check storejs session
        	var app = this.getApp();
        	if(!app.check_valid_session()){
        		var token = storejs.get('gonrin.token');
            	if(token != null){
            		app.session.token = token;
            		$.ajaxSetup({
        	    	    headers: {
        	    	        'content-type':'application/json',
        	    	        'Authorization':token
        	    	    }
        	    	});
            	}
        	}
        	if(app.check_valid_session()){
        		this.navigate("blank");
	    		app.postLogin();
	    	}else{
	    		this.navigate("login");
	    	}
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
        readbaiviet: function(){
        	var readbaiviet = new ReadModelView({el: $("#article")});
        	readbaiviet.render();
        }
    });

});