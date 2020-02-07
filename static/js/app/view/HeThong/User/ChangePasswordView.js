define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/User/changepassword.html');
    	//schema 				= require('json!app/view/HeThong/User/Schema.json');
    
    return Gonrin.View.extend({
    	template : template,
    	urlPrefix: "/api/v1/",
    	collectionName: "user",
    	tools : [
    	    	    {
    	    	    	name: "defaultgr",
    	    	    	type: "group",
    	    	    	groupClass: "toolbar-group",
    	    	    	buttons: [
    						{
    							name: "back",
    							type: "button",
    							buttonClass: "btn-default btn-sm",
    							label: "Quay lại",
    							command: function(){
    								var self = this;
    								Backbone.history.history.back();
    				                //self.getApp().getRouter().navigate(self.collectionName + "/collection");
    							}
    						},
    						{
    			    	    	name: "save",
    			    	    	type: "button",
    			    	    	buttonClass: "btn-success btn-sm",
    			    	    	label: "Đổi mật khẩu",
    			    	    	command: function(){
    			    	    		var self = this;
    			    	    		var pass = self.$el.find("#password").val();
    			                    var newpass = self.$el.find("#newpassword").val();
    			                    var confirm = self.$el.find("#confirm_password").val();
    			                    
    			                    if(newpass === confirm){
    			                    	$.ajax({
      	  				    				url: (self.getApp().serviceURL || "")+'/user/changepw',
      	  				    				method: 'POST',
      	  				    				data: JSON.stringify({password: pass, newpassword: newpass, confirm:confirm}),
      	  				    				dataType: "json",
      	  				    			  	contentType: "application/json",
      	  				    			  	success: function(data) {
      	  				    			  		self.getApp().notify(data.message);

      	  				    			  	},
    		  	  				    	    error: function (request, status, error) {
    		  	  				    	        self.getApp().notify(request.responseText);

    		  	  				    	    }
      	  				    			  	
      	  				    			});
    			                    }else{
    			                    	self.getApp().notify("Mật khẩu mới không khớp với nhập lại mật khẩu mới");

    			                    }
    			    	    	}
    			    	    }
    	    	    	],
    	    	    }
    	        ],
    	render:function(){
    		var self = this;
    	},
    });

});