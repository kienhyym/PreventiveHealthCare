define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/ThongKe/nguoimodel.html'),
    	//schema 				= require('json!app/view/BaoCao/NguoiSchema.json'),
    	schemaDonVi 				= require('json!app/view/ThongKe/NguoiDonViSchema.json');;
    
    
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schemaDonVi,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangnguoi",
    	uiControl:[
			{
			    field: "id",
			    cssClass: false
			},
      	],
    	render:function(){
    		this.$el.find("tr").attr({"donvi_id": this.viewData.donvi_id, "rowtype": "dv"});
    		this.setElement(this.el.innerHTML);
    		this.applyBindings();
    	},
    });
    
});