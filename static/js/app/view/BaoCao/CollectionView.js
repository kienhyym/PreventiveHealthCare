define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/BaoCao/collection.html'),
    	schema 				= require('json!app/view/BaoCao/Schema.json');
    
    var tinhtrangbaocao 	= require('json!app/enum/TinhTrangBaocaoEnum.json');
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "baocao",
    	tools:null,
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
	    	    	 width:200
	    	     },
	    	     {
    	    	    "field": "loaikybaocao",
    	    	    label: "Loại báo cáo",
    	    	    foreignValues: [
                   	     {value: 1, text: "Tuần"},
                   	     {value: 2, text: "Tháng"},
                   	     {value: 3, text: "6 tháng"},
                   	     {value: 4, text: "9 tháng"},
                   	     {value: 5, text: "Năm"},
                   	 ],
                   	 foreignValueField: "value",
                   	 foreignTextField: "text",
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
		     	    "field": "nhanxetnguoi",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "nhanxetphuongtien",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "nhanxethanghoa",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "nhanxetthithe",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "nhanxetvssh",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "nhanxet",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "kiennghi",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "hoatdongkhac",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "nhanlucts",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "nhanlucbienche",
		     	    "visible": false
		     	  },
		     	  {
		     	    "field": "nhanluchopdong",
		     	    "visible": false
		     	  },
		     	  {
			     	"field": "bangnguoi","visible": false
			      },
			      {
				     "field": "bangphuongtien","visible": false
				  },
				  {
					  "field": "banghanghoa","visible": false
				  },
				  {
				     "field": "bangthithe","visible": false
				  },
				  {
					  "field": "bangvssh","visible": false
				  },
				  {
					  "field": "bangdichbenh","visible": false
				  },
				  {
					  "field": "bangxetnghiem","visible": false
				  },
				  {
					  "field": "bangkinhphi","visible": false
				  },
				  {
					  "field": "bangtiemchung","visible": false
				  },
				  {
					  "field": "bangtrinhdochuyenmon","visible": false
				  },
				  {
					  "field": "bangdaotaocanbo","visible": false
				  },
				  {
					  "field": "bangtruyenthong","visible": false
				  },
				  {
					  "field": "bangnghiencuukhoahoc","visible": false
				  },
				  {
					  "field": "banghoptacquocte","visible": false
				  },
				  {
					  "field": "loaibaocao","visible": false
				  },
		     ],
		     onRowClick: function(event){
		    	if(!!event.rowId && !!event.rowData){
		    		var loaiky = event.rowData.loaikybaocao;
		    		var path = null;
		    		if(loaiky === 1){
		    			path = this.collectionName + '/tuanmodel?id='+ event.rowId;
		    		}
		    		if(loaiky === 2){
		    			path = this.collectionName + '/thangmodel?id='+ event.rowId;
		    		}
		    		if(loaiky === 3){
		    			path = this.collectionName + '/6thangmodel?id='+ event.rowId;
		    		}
		    		if(loaiky === 4){
		    			path = this.collectionName + '/9thangmodel?id='+ event.rowId;
		    		}
		    		if(loaiky === 5){
		    			path = this.collectionName + '/nammodel?id='+ event.rowId;
		    		}
		    		if(path){
		    			this.getApp().getRouter().navigate(path);
		    		}
		        		
		        }
		    }
    	},
	    render:function(){
	    	 this.applyBindings();
	    	 return this;
    	},
    });

});