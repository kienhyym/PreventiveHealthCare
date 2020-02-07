define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/ThongKe/vsshmodel.html'),
    	//schema 				= require('json!app/view/BaoCao/NguoiSchema.json'),
    	schemaDonVi 				= require('json!app/view/ThongKe/VSSHDonViSchema.json');;
    
    
    
    return Gonrin.ModelView.extend({
    	template : template,
    	modelSchema	: schemaDonVi,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangvssh",
    	uiControl:[
			{
			    field: "id",
			    cssClass: false
			},
      	],
    	render:function(){
    		this.$el.find("tr").attr({"donvi_id": this.viewData.donvi_id, "rowtype": "dv"});
    		console.log(this.viewData.donvi_id);
    		this.setElement(this.el.innerHTML);
    		this.applyBindings();
    	},
    });
    
});