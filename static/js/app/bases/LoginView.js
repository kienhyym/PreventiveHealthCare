define(function (require) {

    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin            	= require('gonrin'),
        tpl                 = require('text!tpl/base/Login.html'),
        template = _.template(tpl);
    
    var baiviet_tpl = require('text!tpl/base/baiviet_login.html');
    var baiviet_item_tpl = require('text!tpl/base/baiviet_item_tpl.html');

    return Gonrin.View.extend({
        render: function () {
        	
            this.$el.html(template());
            this.handleLogin();
            this.$el.find("#article").append(baiviet_tpl);
            this.fetchBaiViet();
            return this;
        },
        handleLogin : function(){
        	var self = this;
        	$('.login-form').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    username: {
                        required: true
                    },
                    password: {
                        required: true
                    },
                    remember: {
                        required: false
                    }
                },

                messages: {
                    username: {
                        required: "Username is required."
                    },
                    password: {
                        required: "Password is required."
                    }
                },

                invalidHandler: function(event, validator) { //display error alert on form submit   
                    $('.alert-danger', $('.login-form')).show();
                },

                highlight: function(element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
                },

                success: function(label) {
                    label.closest('.form-group').removeClass('has-error');
                    label.remove();
                },

                errorPlacement: function(error, element) {
                    error.insertAfter(element.closest('.input-icon'));
                },

                submitHandler: function(form) {
                    //form.submit(); // form validation success, call ajax form submit
                	self.processLogin();
                }
            });
        	
        },
        events: {
       	 //'click #login-btn' : 'processLogin',
       	 //'click button#submit-btn': 'processLogin'
       	},

       	processLogin: function(){
       		var username = this.$('[name=username]').val();
       		var password = this.$('[name=password]').val();

       		var data = JSON.stringify({
   		        username: username,
   		        password: password
   		    });
       		var self = this;
       		$.ajax({
       		    url: '/api/v1/login',
       		    type: 'post',
       		    data: data,
       		    headers: {
       		    	'content-type': 'application/json'
       		    },
       		    dataType: 'json',
       		    success: function (data) {
       		    	
       		    	// $.ajaxSetup({
       		    	//     headers: {
       		    	//         'content-type':'application/json',
       		    	//         'Authorization':"Bearer " + data.token
       		    	//     }
       		    	// });
       		    	//get UserInfo and Permission
       		    	//app.trigger("login_succeeded.app");
       		    	//
       		    	
       		    	//self.getApp().getRouter().navigate("index");
       		    	self.getApp().postLogin(data);
       		    },
       		    error: function(XMLHttpRequest, textStatus, errorThrown) {
       		    	self.getApp().notify("Login error");
       		    }
       		});
       	},
       	
       	fetchBaiViet: function(){
			var self = this;
			self.$el.find("#baiviet_container").empty();
			
			var order_by = [{"field": "ngaytao", "direction": "desc"}];
			var filters = {"phamvi": {"$eq": "thongtin"}};
			//ajax
			$.ajax({
				url: "/api/v1/baiviet",
				data: {"q": JSON.stringify({"filters": filters, "order_by": order_by})},
				method: "GET",
				contentType: "application/json",
				success: function (data) {
					self.renderBaiViet(data.objects);
				},
				error: function (xhr, status, error) {

				},
			});
		},
		renderBaiViet: function(data){
			var self = this;
			$.each(data, function(idx, obj){
				var tpl = gonrin.template(baiviet_item_tpl)(obj);
	            self.$el.find("#baiviet_container").append(tpl);
			})
		}

    });

});