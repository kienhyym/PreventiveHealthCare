define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/DangKy/DangKyBo/model.html'),
    	schema 				= require('json!app/view/DangKy/DangKyBo/Schema.json');
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bo",
    	state: null,
    	uiControl:[
			{
				field:"ngaysinh",
				textFormat:"YYYY/MM/DD",
				extraFormats:["DDMMYYYY"]
			},     
    	],
    	render:function(){
    		var self = this;
    		console.log(this.uiControl);
    		var id = this.getApp().getRouter().getParam("id");
    		var userId = this.getApp().currentUser.id;
    		console.log(userId);
    		console.log(this.getApp().currentUser);
    		this.model.set('user_id', userId);
    		if(id){
    			//progresbar quay quay
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        			},
        			error:function(){
    					self.getApp().notify("Get data Eror");
    				},
        		});
    		}else{
    			self.applyBindings();
    		}
    		
    	},
    });

});