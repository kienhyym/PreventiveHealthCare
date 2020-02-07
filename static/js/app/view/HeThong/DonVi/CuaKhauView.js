define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/DonVi/cuakhaumodel.html'),
    	schema 				= require('json!app/view/HeThong/CuaKhau/Schema.json');
    
    
    return Gonrin.ItemView.extend({
    	template : template,
    	tagName: 'tr',
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "cuakhau",
    	foreignRemoteField: "id",
    	foreignField: "donvi_id",
    	uiControl:[
			{
			    field: "id",
			    cssClass: false
			},
      	],
    	render:function(){
    		var self = this;
    		this.applyBindings();
    		self.$el.find("#detail").unbind("click").bind("click", function(){
    			var path = "cuakhau/model?id=" + self.model.get("id");
    			self.getApp().getRouter().navigate(path);
    		});
    	},
    });
    
});