define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaiViet/read_model.html'),
    	schema 				= require('json!app/view/BaiViet/Schema.json');
    var tooltemplate 				= require('text!tpl/BaiViet/tool_model.html');
    return Gonrin.ModelView.extend({
    	template : tooltemplate,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "baiviet",
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
    							label: "TRANSLATE:BACK",
    							command: function(){
    								var self = this;
    								//Backbone.history.history.back();
    				                self.getApp().getRouter().navigate("index");
    							}
    						}
    	    	    	]
    	    	    },
    	    	],
    	uiControl:[],
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			//progresbar quay quay
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				//self.applyBindings();
        				console.log(data);
        				var tpl = gonrin.template(template)(self.model.toJSON());
        	            self.$el.append(tpl);
        			},
        			error:function(){
    					self.getApp().notify("Get data Eror");
    					self.getApp().getRouter().navigate("index");
    				},
        		});
    		}else{
    			self.getApp().getRouter().navigate("index");
    		}
    		
    	},
    });

});