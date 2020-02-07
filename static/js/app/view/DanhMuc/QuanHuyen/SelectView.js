define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/QuanHuyen/collection.html'),
    	schema 				= require('json!app/view/DanhMuc/QuanHuyen/Schema.json');
    
    return Gonrin.CollectionDialogView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "quanhuyen",
    	textField: "ten",
    	valueField: "id",
    	uiControl:{
    		fields: [
    	    	     { 
    	    	    	field: "id",label:"ID",width:250,readonly: true, 
    	    	     },
    		     	 { field: "ten", label: "Tên", width:250 },
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