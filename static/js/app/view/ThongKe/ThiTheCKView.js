define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/ThongKe/thitheckmodel.html'),
    	schema 				= require('json!app/view/BaoCao/ThiTheSchema.json');
    	//schemaDonVi 				= require('json!app/view/ThongKe/NguoiDonViSchema.json');;
    
    
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangthithe",
    	uiControl:[
			{
			    field: "id",
			    cssClass: false
			},
      	],
    	render:function(){
    		this.$el.find("tr").attr({"donvi_id": this.viewData.donvi_id, "rowtype": "ck"});
    		this.setElement(this.el.innerHTML);
    		this.applyBindings();
    	},
    });
    
});