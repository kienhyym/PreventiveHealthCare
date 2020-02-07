define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/QuocGia/collection.html'),
    	schema 				= require('json!app/view/DanhMuc/QuocGia/Schema.json');
    
    return Gonrin.CollectionDialogView.extend({
    	//selectedItems : [],  //[] may be array if multiple selection
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "quocgia",
    	textField: "ten",
    	//valueField: "id",
    	tools : [
    	    	    {
    	    	    	name: "defaultgr",
    	    	    	type: "group",
    	    	    	groupClass: "toolbar-group",
    	    	    	buttons: [
    						{
    			    	    	name: "select",
    			    	    	type: "button",
    			    	    	buttonClass: "btn-success btn-sm",
    			    	    	label: "TRANSLATE:SELECT",
    			    	    	command: function(){
    			    	    		var self = this;
    			    	    		//console.log(self.$dialog);
    			    	    		//var selected = self.getCollectionElement();
    			    	    		self.trigger("onSelected");
    			    	    		self.close();
    			    	    	}
    			    	    },
    	    	    	]
    	    	    },
    	    	],
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "id",label:"ID",width:250,readonly: true, 
	    	     },
	    	     { field: "ma", label: "Mã", width:250},
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