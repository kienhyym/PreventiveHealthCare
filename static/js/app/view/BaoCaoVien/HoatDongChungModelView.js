define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 				= require('text!tpl/BaoCaoVien/hoatdongchungmodel.html'),
    	schema 				= require('json!app/view/BaoCaoVien/HoatDongChungSchema.json');
    
    
    return Gonrin.ItemView.extend({
    	template : template,
    	tagName: 'tr',
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "bangvienhoatdongchung",
    	foreignRemoteField: "id",
    	foreignField: "baocao_id",
    	uiControl:[
			{
			    field: "id",
			    cssClass: false
			},
			{
			    field: "tenhoatdong",
			    uicontrol: "combobox",
			    dataSource: [
			         {value:"Kiểm tra, giám sát, hướng dẫn địa phương"},
			         {value:"Đào tạo, tập huấn"},
			         {value:"Nghiên cứu khoa học"},
			         {value:"Xây dựng tài liệu hướng dẫn chuyên môn, kỹ thuật"},
			         {value:"Hoạt động khác"},
			    ],
				textField: "value",
				valueField: "value",
				height: "200px"
			},
      	],
    	render:function(){
    		this.applyBindings();
    	},
    });
    
});