define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/Role/select.html'),
    	schema 				= require('json!app/view/HeThong/Role/Schema.json');
    
    return Gonrin.CollectionDialogView.extend({
    	//selectedItems : [],  //[] may be array if multiple selection
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "role",
    	textField: "description",
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
    			    	    		this.trigger("onSelected");
    			    	    		this.close();
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
	    	     { field: "name", label: "Tên"},
		     	 { field: "description", label: "Tên", width:250 },
		    ],
		    onRowClick: function(event){
		    	if(event.selectedItems.length > 0){
		    		this.uiControl.selectedItems = [event.selectedItems[0]];
		    	}
	    		
	    	},
    	},
    	render:function(){
	    	 this.applyBindings();
	    	 return this;
    	},
    	
    });

});