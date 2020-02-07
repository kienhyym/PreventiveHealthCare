define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/TinhThanh/model.html'),
    	schema 				= require('json!app/view/DanhMuc/TinhThanh/Schema.json');
    
    var QuocGiaSelectView = require("app/view/DanhMuc/QuocGia/SelectView");
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "tinhthanh",
    	uiControl:[
    		/*{
    			field:"quocgia_id", 
    			label:"Quốc gia",
    			uicontrol:"ref",
    			textField: "ten",
    			valueField: "id",
    			dataSource: "app/view/DanhMuc/QuocGia/SelectView"
    		},*/
    		{
    			field:"quocgia",
    			uicontrol:"ref",
    			textField: "ten",
    			//chuyen sang thanh object
    			foreignRemoteField: "id",
    			foreignField: "quocgia_id",
    			dataSource: QuocGiaSelectView
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