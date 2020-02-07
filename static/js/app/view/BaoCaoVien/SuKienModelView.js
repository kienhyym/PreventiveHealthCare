define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCaoVien/sukienmodel.html'),
    	schema 				= require('json!app/view/BaoCaoVien/SuKienSchema.json');
    
    
    return Gonrin.ItemView.extend({
    	template : template,
    	tagName: 'tr',
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangviensukien",
    	foreignRemoteField: "id",
    	foreignField: "baocao_id",
    	uiControl:[
			{
			    field: "id",
			    cssClass: false
			},
			{
			    field: "tensukien",
			    cssClass: false
			},
			{
			    field: "diadiem",
			    cssClass: false
			},
			{
			    field: "bienphap",
			    cssClass: false
			},
			{
			    field: "ketqua",
			    cssClass: false
			},
      	],
    	render:function(){
    		this.applyBindings();
    	},
    });
    
});