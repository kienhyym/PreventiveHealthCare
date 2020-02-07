define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/CuaKhau/collection.html'),
    	schema 				= require('json!app/view/HeThong/CuaKhau/Schema.json');
    
    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "cuakhau",
    	textField: "ten",
    	valueField: "id",
    	uiControl:{
    		fields: [
				{ 
					field: "id",label:"ID"
				},
				{ field: "ma", label: "Mã"},
				{ field: "ten", label: "Tên"},
				{ 
					field: "donvi_id", 
					label: "Đơn vị",
		     		foreign: "donvi",
		     		foreignValueField: "id",
		     		foreignTextField: "ten",
				},
				{
		     		field: "tinhthanh_id", 
		     		label: "Tỉnh thành",
		     		foreign: "tinhthanh",
		     		foreignValueField: "id",
		     		foreignTextField: "ten",
				},
				{ field: "kiemdichyte", visible:false},
				{ field: "phongcachly", visible:false},
				{ field: "nguoilienlac", visible:false},
				{ field: "sodienthoai",  visible:false},
				{ field: "diachi", visible:false},
				{ field: "email", visible:false},
				{ field: "thutu", visible:false},
		     	{ field: "duongbophu", visible:false},
		     	{ field: "duonghangkhong", visible:false},
		     	{ field: "duongthuyloai1", visible:false},
		     	{ field: "duongthuyloai2", visible:false},
		     	{ field: "duongboquocte", visible:false},
		     	{ field: "duongbochinh", visible:false},
		     	{ field: "duongsat", visible:false},
		     	
		     	{ field: "tinhthanh", visible:false},
		     	{ field: "donvi", visible:false},

		     	{ field: "quocgia_tiepgiap", visible:false},
		     	{ field: "cuakhau_tiepgiap", visible:false},
		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function(){
	    	 this.applyBindings();
	    	 return this;
    	},
    	
    });

});