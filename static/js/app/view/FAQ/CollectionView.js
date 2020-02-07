define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/FAQ/collection.html'),
    	schema 				= require('json!app/view/FAQ/Schema.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "faq",
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "id",label:"ID",width:250,readonly: true, 
	    	     },
	    	     { field: "tieude", label: "Mã", width:250},
		     	 { field: "noidung", label: "Tên", width:250 },
		     ],
		     onRowClick: function(event){
		    	if(event.rowId){
		        		var path = this.collectionName + '/model?id='+ event.rowId;
		        		this.getApp().getRouter().navigate(path);
		        }
		    }
    	},
	    render:function(){
	    	var self = this;
    		self.collection.fetch({
                success: function () {
                	self.collection.each(function(model) {
                		var html = '<p><b>' + model.get("tieude") + '</b><br/>' + model.get("noidung") + '</p><hr/>';
                		self.$el.append(html);
					});
                },
                error:function(){
                	//self.loader({message: "LOADER_RELOAD"});
                },
            });
	    	 return this;
    	},
    });

});