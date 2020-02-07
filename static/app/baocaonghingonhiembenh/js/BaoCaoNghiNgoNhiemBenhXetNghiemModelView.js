define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/TimKiemBaoCao/baocaonghingonhiembenhxetnghiemmodel.html'),
    	schema 				= require('json!app/view/TimkiemBaoCao/BaoCaoNghiNgoNhiemBenhXetNghiem.json');
    
    
    return Gonrin.ItemView.extend({
    	template : template,
    	tagName: 'div',
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "BaoCaoNghiNgoNhiemBenhXetNghiem",
    	foreignRemoteField: "id",
    	foreignField: "baocao_id",
    	// uiControl:[
		// 	{
		// 	    field: "id",
		// 	    cssClass: false
		// 	},
      	// ],
    	render:function(){
    		this.applyBindings();
    	},
    });
    
});