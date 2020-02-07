define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/BaoCaoVien/collection.html'),
    	schema 				= require('json!app/view/BaoCaoVien/Schema.json');
    var tinhtrangbaocao 	= require('json!app/enum/TinhTrangBaocaoEnum.json');
    var seskey = "baocaoviencollection_";
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "baocaovien",
    	/*tools: [
          	    {
          	    	name: "default",
          	    	type: "group",
          	    	groupClass: "toolbar-group",
          	    	buttons: [
      					{
      		    	    	name: "create",
      		    	    	type: "button",
      		    	    	buttonClass: "btn-success btn-sm",
      		    	    	label: "TRANSLATE:CREATE",
      		    	    	command: function(){
      		    	    		var self = this;
      		    	    		var path = self.collectionName + '/model';
      		    	    		self.getApp().getRouter().navigate(path);
      		    	    	}
      		    	    },
          	    	]
          	    },
          	 ],*/
    	tools: null,
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "id",label:"ID"
	    	     },
	    	     { field: "ma", label: "Mã"},
		     	 {
		     		field: "donvi_id", 
					label: "Đơn vị",
		     		foreign: "donvi",
		     		foreignValueField: "id",
		     		foreignTextField: "ten",
		     	 },
		     	{
	    	    	    "field": "kybaocao",
	    	    	    label: "Kỳ"
	    	    	  },
			     	 { field: "ngaybaocao", label: "Ngày báo cáo", textFormat:"DD/MM/YYYY"},
			     	 { field: "nambaocao", label: "Năm báo cáo"},
			     	 {
			     	    "field": "tungay",
			     	    label: "Từ ngày"
			     	 },
			     	 {
			     	    "field": "denngay",
			     	    label: "Đến ngày"
			     	 },
			     	{
	    	    	    "field": "tinhtrang",
	    	    	    label: "Tình trạng",
	    	    	    foreignValues: tinhtrangbaocao,
	    	            foreignValueField: "value",
	    	            foreignTextField: "text",
	    	    	 },
			     	 {
			     	    "field": "danhgia",
			     	    "visible": false
			     	  },
			     	  {
			     	    "field": "kiennghivien",
			     	    "visible": false
			     	  },
			     	  {
			     	    "field": "kiennghidonvi",
			     	    "visible": false
			     	  },
			     	 {
				     	"field": "bangviensukien",
				     	"visible": false
				    },
				    {
				     	"field": "bangviencanbo",
				     	"visible": false
				    },
				    {
				     	"field": "bangvienhoatdongchung",
				     	"visible": false
				    },
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
	    	 this.applyBindings();
	    	 
	    	 return this;
    	},
    	
    });

});