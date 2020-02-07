define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/BaiViet/collection.html'),
    	schema 				= require('json!app/view/BaiViet/Schema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "baiviet",
    	uiControl:{
    		orderBy:[{"field": "ngaytao", "direction": "desc"}],
    		fields: [
	    	     { 
	    	    	field: "id",label:"ID",width:250,readonly: true, 
	    	     },
	    	     { field: "tieude", label: "Tiêu đề", width:250},
		     	 { field: "gioithieu", label: "Giới thiệu"},
		     	 { field: "ngaytao", visible: false},
		     	{ field: "noidung", visible: false},
		     	{
               	 field: "phamvi", 
               	 label: "Phạm vi",
               	 foreignValues: [
					{"value": "thongtin", "text": "Thông tin"},
					{"value": "vanbanchidao", "text": "Văn bản chỉ đạo, hướng dẫn"},
					{"value": "quyphamphapluat", "text": "Văn bản quy phạm pháp luật"},
    				             ],
               	 foreignValueField: "value",
               	 foreignTextField: "text",
              	 },
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    }
    	},
	    render:function(){
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});