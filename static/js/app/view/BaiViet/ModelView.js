define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaiViet/model.html'),
    	schema 				= require('json!app/view/BaiViet/Schema.json');
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "baiviet",
    	uiControl:[
			{
				field:"noidung",
				uicontrol: "gonrinEditor",
			},
			{
				field: "phamvi",
				uicontrol: "combobox",
				dataSource: [
				             {"value": "thongtin", "text": "Thông tin"},
				             {"value": "vanbanchidao", "text": "Văn bản chỉ đạo, hướng dẫn"},
				             {"value": "quyphamphapluat", "text": "Văn bản quy phạm pháp luật"},
				             ],
				textField: "text",
				valueField: "value"
			}
    	],
    	render:function(){
    		var self = this;
    		console.log(this.uiControl);
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