define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/QuanHuyen/model.html'),
    	schema 				= require('json!app/view/DanhMuc/QuanHuyen/Schema.json');
    
    var TinhThanhSelectView = require("app/view/DanhMuc/TinhThanh/SelectView");
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "quanhuyen",
    	uiControl:[ 
    				{
    					field:"tinhthanh",
    					uicontrol:"ref",
    					textField: "ten",
    					//chuyen sang thanh object
    					foreignRemoteField: "id",
    					foreignField: "tinhthanh_id",
    					dataSource: TinhThanhSelectView
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