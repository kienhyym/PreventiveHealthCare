define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/User/model.html'),
    	schema 				= require('json!app/view/HeThong/User/Schema.json');
    
    var RoleSelectView = require("app/view/HeThong/Role/SelectView");
    var DonViSelectView = require("app/view/HeThong/DonVi/TreeNoChildrenSelectView");
    var CuaKhauSelectView = require("app/view/HeThong/CuaKhau/SelectView");
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "user",
    	uiControl: [
			{
				field:"roles", 
				label:"Loại người dùng",
				uicontrol:"ref",
				textField: "description",
				selectionMode: "multiple",
				dataSource: RoleSelectView
			},
			{
				  field:"donvi",
				  uicontrol: "ref",
				  textField: "ten",
				  //valueField: "value",
				  foreignRemoteField: "id",
	    		  foreignField: "donvi_id",
				  dataSource: DonViSelectView,
            },
            {
				  field:"cuakhau",
				  uicontrol: "ref",
				  textField: "ten",
				  //valueField: "value",
				  foreignRemoteField: "id",
	    		  foreignField: "cuakhau_id",
				  dataSource: CuaKhauSelectView
            },
    	],
    	render:function(){
    		var self = this;
    		var id = this.getApp().getRouter().getParam("id");
    		if(id){
    			//progresbar quay quay
    			this.model.set('id',id);
        		this.model.fetch({
        			success: function(data){
        				self.applyBindings();
        				self.registerEvents();
        			},
        			error:function(){
    					self.getApp().notify("Get data Eror");
    				},
        		});
    		}else{
    			self.applyBindings();
    			self.registerEvents();
    		}
    		
    	},
    	registerEvents: function(){
    		var self = this;
    		self.model.on("change:donvi", function(){
				console.log(self.model.get("roles"));
    			var ckel = self.getFieldElement("cuakhau");
    			
    			if(!!ckel){
    				var donvi = self.model.get("donvi");
    				if (!!donvi){
    					ckel.data("gonrin").filters({donvi_id: {"$eq":donvi.id}});
    				}else{
    					ckel.data("gonrin").filters(null);
    				}
    				
    			}
    		})
    	}
    });

});