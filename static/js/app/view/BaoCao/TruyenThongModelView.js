define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCao/truyenthongmodel.html'),
    	schema 				= require('json!app/view/BaoCao/TruyenThongSchema.json');
    
    
    return Gonrin.ItemView.extend({
    	template : template,
    	tagName: 'tr',
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangtruyenthong",
    	foreignRemoteField: "id",
    	foreignField: "baocao_id",
    	uiControl:[
			{
			    field: "id",
			    cssClass: false
			},
      	],
    	render:function(){
    		this.applyBindings();
    	},
    });
    
});