define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/DonVi/modelchitiet.html'),
    	schema 				= require('json!app/view/HeThong/DonVi/Schema.json');
    
    var TuyenDonViEnum = require('json!app/enum/TuyenDonViEnum.json');
    var DonViSelectView = require("app/view/HeThong/DonVi/TreeSelectView");
    var TinhThanhSelectView = require("app/view/DanhMuc/TinhThanh/SelectView");
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "donvi",
    	uiControl: [
			{ 
				  field: "id",label:"ID",width:250,readonly: true, 
			},
			{ field: "ten", label: "Tên", width:250 },
			{ field: "ma", label: "Mã", width:250},
			{
				  field:"tuyendonvi",
				  uicontrol: "combobox",
				  textField: "text",
				  valueField: "value",
				  dataSource: TuyenDonViEnum,
			},
			{
				  field:"parent",
				  uicontrol: "ref",
				  textField: "ten",
				  //valueField: "value",
				  foreignRemoteField: "id",
				  foreignField: "parent_id",
				  dataSource: DonViSelectView,
			},
			{
				  field:"tinhthanh",
				  uicontrol: "ref",
				  textField: "ten",
				  //valueField: "value",
				  foreignRemoteField: "id",
	    		  foreignField: "tinhthanh_id",
				  dataSource: TinhThanhSelectView,
			},
			
			{
				  field:"loaidonvi",
				  uicontrol: "combobox",
				  textField: "text",
				  valueField: "value",
				  dataSource: [
			  	  {
			  		  value: 10,text: "TT KDYT Quốc tế"
			  	  },
			  	  {
			  		  value: 20,text: "TT YTDP tỉnh, thành"
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
    			//self.model.unset("cuakhau");
    			//self.model.unset("parent");
    			self.applyBindings();
    		}
    		
    	},
    });

});