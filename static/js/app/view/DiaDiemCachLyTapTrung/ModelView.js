define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/CuaKhau/model.html'),
    	schema 				= require('json!app/view/HeThong/CuaKhau/Schema.json');
    
    var TinhThanhSelectView = require("app/view/DanhMuc/TinhThanh/SelectView");
    var DonViSelectView = require("app/view/HeThong/DonVi/TreeNoChildrenSelectView");
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "cuakhau",

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
			                self.getApp().getRouter().navigate(self.collectionName + "/collection");
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
		    	    	},
		    	    	visible: function(){
     	        		   if(this.getApp().currentUser !== null){
     	        			   return this.getApp().currentUser.hasRole("Admin") || this.getApp().currentUser.hasRole("DonViAdmin");
     	        		   }
     	        		   return false;
     	        	   },
		    	    },
					{
		    	    	name: "delete",
		    	    	type: "button",
		    	    	buttonClass: "btn-danger btn-sm",
		    	    	label: "TRANSLATE:DELETE",
		    	    	visible: function(){
		    	    		return this.getApp().getRouter().getParam("id") !== null;
		    	    	},
		    	    	command: function(){
		    	    		var self = this;
		                    self.model.destroy({
		                        success: function(model, response) {
		                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
		                        },
		                        error: function (model, xhr, options) {
		                            //self.alertMessage("Something went wrong while processing the model", false);
		                            self.getApp().notify('Delete error');
		                        }
		                    });
		    	    	},
		    	    	visible: function(){
	     	        		   if(this.getApp().currentUser !== null){
	     	        			   return this.getApp().currentUser.hasRole("Admin") || this.getApp().currentUser.hasRole("DonViAdmin");
	     	        		   }
	     	        		   return false;
	     	        	   },
		    	    },
    	    	]
    	    },
    	],
    	uiControl:[
			{ 
				  field: "id",label:"ID",width:250,readonly: true, 
			},
			{ field: "ten", label: "Tên", width:250 },
			{ field: "ma", label: "Mã", width:250},
            {
    			field:"donvi",
    			uicontrol:"ref",
    			textField: "ten",
    			foreignRemoteField: "id",
    			foreignField: "donvi_id",
    			dataSource: DonViSelectView
    		},
            
            {
				  field:"tinhthanh",
				  uicontrol: "ref",
				  textField: "ten",
				  foreignRemoteField: "id",
	    		  foreignField: "tinhthanh_id",
				  dataSource: TinhThanhSelectView,
            },
            {
				  field:"kiemdichyte",
				  uicontrol: "checkbox",
				  checkedField: "name",
                  valueField: "value",
                  cssClassField: "cssClass",
                  dataSource: [
                               { name: true, value: true},
                               { name: false, value: false },
                  ],
            },
            {
				  field:"phongcachly",
				  uicontrol: "checkbox",
				  checkedField: "name",
				  valueField: "value",
				  cssClassField: "cssClass",
				  dataSource: [
                             { name: true, value: true},
                             { name: false, value: false },
                  ],
            },
            {
				  field:"duongboquocte",
				  uicontrol: "checkbox",
				  checkedField: "name",
				  valueField: "value",
				  cssClassField: "cssClass",
				  dataSource: [
                           { name: true, value: true},
                           { name: false, value: false },
                ],
            },
            {
            	field:"duongbochinh",
            	uicontrol: "checkbox",
            	checkedField: "name",
            	valueField: "value",
            	cssClassField: "cssClass",
            	dataSource: [
                         { name: true, value: true},
                         { name: false, value: false },
                ],
            },
            {
				 field:"duongbophu",
				 uicontrol: "checkbox",
				 checkedField: "name",
				 valueField: "value",
				 cssClassField: "cssClass",
				 dataSource: [
                       { name: true, value: true},
                       { name: false, value: false },
                 ],
            },
            {
				 field:"duongsat",
				 uicontrol: "checkbox",
				 checkedField: "name",
				 valueField: "value",
				 cssClassField: "cssClass",
				 dataSource: [
                      { name: true, value: true},
                      { name: false, value: false },
                ],
            },
            {
				 field:"duonghangkhong",
				 uicontrol: "checkbox",
				 checkedField: "name",
				 valueField: "value",
				 cssClassField: "cssClass",
				 dataSource: [
                     { name: true, value: true},
                     { name: false, value: false },
               ],
            },
            {
				 field:"duongthuyloai1",
				 uicontrol: "checkbox",
				 checkedField: "name",
				 valueField: "value",
				 cssClassField: "cssClass",
				 dataSource: [
                    { name: true, value: true},
                    { name: false, value: false },
              ],
            },
            {
				 field:"duongthuyloai2",
				 uicontrol: "checkbox",
				 checkedField: "name",
				 valueField: "value",
				 cssClassField: "cssClass",
				 dataSource: [
                    { name: true, value: true},
                    { name: false, value: false },
              ],
            },
            {
				 field:"quocgia_tiepgiap",
				 uicontrol: "combobox",
				  textField: "value",
				  valueField: "value",
				  dataSource: [
			  	  {
			  		  value: "Trung Quốc"
			  	  },
			  	  {
			  		  value: "Lào"
			  	  },
			  	  {
			  		  value: "Campuchia"
			  	  }
				  ],
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