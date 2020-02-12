define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/DiaDiemCachLyTapTrung/collection.html'),
    	schema 				= require('json!app/view/DiaDiemCachLyTapTrung/Schema.json');
    
    return Gonrin.CollectionDialogView.extend({
    	template : template,
		modelSchema	: schema,
		bindings:"data-dd-bind",
    	urlPrefix: "/api/v1/",
    	collectionName: "diadiemcachlytaptrung",
    	textField: "ten",
    	valueField: "id",
    	uiControl:{
    		fields: [
				{ 
					field: "id",label:"ID"
				},
				{ field: "ma", label: "Mã"},
				{ field: "ten", label: "Tên"},
				{ field: "diachi", label: "Địa chỉ"},
				
				// { 
				// 	field: "donvi_id", 
				// 	label: "Đơn vị",
		     	// 	foreign: "donvi",
		     	// 	foreignValueField: "id",
		     	// 	foreignTextField: "ten",
				// },
				// {
		     	// 	field: "tinhthanh_id", 
		     	// 	label: "Tỉnh thành",
		     	// 	foreign: "tinhthanh",
		     	// 	foreignValueField: "id",
		     	// 	foreignTextField: "ten",
				// },
				{ field: "cuakhau_id", visible:false},
				{ field: "donvi_id", visible:false},
				{ field: "nguoilienlac", visible:false},
				{ field: "sodienthoai",  visible:false},
				{ field: "email", visible:false},
				{ field: "ghichu", visible:false},
				// { field: "thutu", visible:false},
		     	// { field: "duongbophu", visible:false},
		     	// { field: "duonghangkhong", visible:false},
		     	// { field: "duongthuyloai1", visible:false},
		     	// { field: "duongthuyloai2", visible:false},
		     	// { field: "duongboquocte", visible:false},
		     	// { field: "duongbochinh", visible:false},
		     	// { field: "duongsat", visible:false},
		     	
		     	// { field: "tinhthanh", visible:false},
		     	// { field: "donvi", visible:false},

		     	// { field: "quocgia_tiepgiap", visible:false},
		     	// { field: "cuakhau_tiepgiap", visible:false},
		    ],
		    onRowClick: function(event){
	    		this.uiControl.selectedItems = event.selectedItems;
	    	},
    	},
    	render:function(){
			var self = this;
			var user = self.getApp().currentUser;
			var info = user.info;
			var donvi_id = null;
			
			var donvi = info.donvi;
			if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
				donvi_id = donvi.id
			}
			
			if ( !!donvi_id){
                var filter = {
                    "donvi_id": {
                        "$eq": donvi_id
                    }
                }
                this.uiControl.filters = filter;
			}
			console.log("Det diadiem");
			this.applyBindings();
	    	return this;
    	},
    	
    });

});