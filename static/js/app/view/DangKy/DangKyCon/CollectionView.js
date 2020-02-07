define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/DangKy/DangKyCon/collection.html'),
    	schema 				= require('json!app/view/DangKy/DangKyCon/Schema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "con",
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "id",label:"ID",width:250,readonly: true,visible:false
	    	     },
	    	     { field: "me_id", label: "Mẹ", width:120, readonly:true },
	    	     { field: "bo_id", label: "Bố", width:120, readonly:true },
	    	     { field: "ma", label: "Mã", width:80},
		     	 { field: "hoten", label: "Tên", width:250 },
		     	{ field: "ngaysinh", label: "Ngày sinh", width:120, visible:false },
		     	{ field: "gioitinh", label: "Giới tính", width:100 },
		     	{ field: "noisinh", label: "Nơi sinh", width:250, visible:false },
		     	{ field: "user_id", label: "Người tạo", width:250, visible:false}
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    	 //this.getApp().loading(); 
		    	 //this.getApp().alert("haha");
		    	
		    }
    	},
	    render:function(){
	    	 this.applyBindings();
//	    	 this.$el.find("#test").val("ABC NAM NAM");
//	    	 this.$el.find("#btn").bind("l",);
	    	 return this;
    	},
    });

});