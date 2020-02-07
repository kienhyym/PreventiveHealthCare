define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/Role/model.html'),
    	schema 				= require('json!app/view/HeThong/Role/Schema.json');
    
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "role",
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
 			    	    		this.getApp().getRouter().navigate(this.collectionName + "/collection");
 			    	    	}
 			    	    },
 			    	   {
 			    	    	name: "save",
 			    	    	type: "button",
 			    	    	buttonClass: "btn-success btn-sm",
 			    	    	label: "TRANSLATE:SAVE",
 			    	    	command: function(){
 			    	    		var self = this;
 			                    self.model.save(null,{
 			                        success: function (model, respose, options) {
 			                            self.getApp().notify("Save successfully");
 			                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
 			                        },
 			                        error: function (model, xhr, options) {
 			                            //self.alertMessage("Something went wrong while processing the model", false);
 			                            self.getApp().notify('Save error');
 			                        }
 			                    });
 			    	    	}
 			    	    },
 	    	    	]
 	    	    },
 	    	],
    	//uiControl:[
      				
      	//    	],
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
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