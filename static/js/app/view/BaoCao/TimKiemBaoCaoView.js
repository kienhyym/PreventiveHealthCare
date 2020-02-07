define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/BaoCao/timkiembaocao.html'),
    	schema 				= require('json!app/view/BaoCao/Schema.json');
    
    var tinhtrangbaocao 	= require('json!app/enum/TinhTrangBaocaoEnum.json');
    var DonViSelectView = require('app/view/HeThong/DonVi/TreeSelectView');
    
    
    var filtertemplate 			= require('text!tpl/BaoCao/timkiembaocao_filter.html');
    var filterschema = {
			"donvi_id": {
			    "type": "number"
			},
			"donvi": {
			    "type": "dict"
			},
			"loaikybaocao": {
			    "type": "number"
			},
			"tinhtrang": {
			    "type": "number"
			},
			"thang": {
			    "type": "number"
			},
			"nam": {
			    "type": "number"
			}
	}
    
    var FilterView = Gonrin.FilterView.extend({
    	template : filtertemplate,
    	modelSchema	: filterschema,
    	urlPrefix: "/api/v1/",
    	collectionName: "filter",
    	sesionKey : "timkiembaocao_",
    	uiControl:[
			{
				  field:"donvi",
				  uicontrol: "ref",
				  textField: "ten",
				  foreignRemoteField: "id",
				  foreignField: "donvi_id",
				  dataSource: DonViSelectView,
			},
			{
				  field:"loaikybaocao",
				  uicontrol: "combobox",
				  dataSource: [
	                	  {value: null,text: "Tất cả"},
	                	  {value: 1,text: "Tuần"},
	                	  {value: 2,text: "Tháng"},
	                	  {value: 3,text: "6 Tháng"},
	                	  //{value: 4,text: "9 Tháng"},
	                	  {value: 5,text: "Năm"},
	                	 ],
	                textField: "text",
	                valueField: "value"
			},
			{
				  field:"thang",
				  uicontrol: "combobox",
				  dataSource: [
	                	  {value: null,text: "Tất cả"},
	                	  {value: 1,text: "1"},
	                	  {value: 2,text: "2"},
	                	  {value: 3,text: "3"},
	                	  {value: 4,text: "4"},
	                	  {value: 5,text: "5"},
	                	  {value: 6,text: "6"},
	                	  {value: 7,text: "7"},
	                	  {value: 8,text: "8"},
	                	  {value: 9,text: "9"},
	                	  {value: 10,text: "10"},
	                	  {value: 11,text: "11"},
	                	  {value: 12,text: "12"},
	                	 ],
	                textField: "text",
	                valueField: "value"
			},
			{
			    field: "tinhtrang",
			    uicontrol: "combobox",
			    dataSource: tinhtrangbaocao,
				textField: "text",
				valueField: "value",
			},
    	],
    	render:function(){
    		var self = this;
    		//session here
    		this.getDataFromSession();
    		if(self.model.get("nam") === null){
    			self.model.set("nam", moment().year());
    		}
    		this.applyBindings();
    		var filterBtn = self.$el.find("#filterBtn");
    		filterBtn.unbind("click").bind("click", function(){
    			self.triggerFilter();
    		});
    	},
    });
    
    return Gonrin.View.extend({
    	template : template,
    	urlPrefix: "/api/v1/",
    	collectionName: "baocao",
    	tools:null,
    	
	    render:function(){
	    	 //
	    	var self = this;
	    	this.applyBindings();
	    	var $filter = this.$el.find("#filter");
	    	var filterView = new FilterView({el: $filter});
	      	filterView.render();
	      	filterView.on('filterChanged', function(evt){
	      		var donvi_id = evt.data.donvi_id;
	    		var loaiky = evt.data.loaikybaocao;
	    		var tinhtrang = evt.data.tinhtrang;
	    		var thang = evt.data.thang;
	    		var nam = evt.data.nam;
	    		var loaibaocao = 1; //baocaodon vi
	    		
	    		var url = "/api/v1/timkiembaocao";
	    		//ajax
	    		$.ajax({
	 				url: url,
	 				data: {nam:nam, donvi_id:donvi_id,thang:thang, loaibaocao: loaibaocao, loaiky: loaiky, tinhtrang: tinhtrang},
	 				dataType: "json",
	 				contentType: "application/json",
	 				success: function(data) {
	 					console.log("getdatave");
	 					self.$el.find("#grid").grid({
	 						dataSource:data,
	 						context:self,
	 						primaryField:"id",
	 						selectionMode: "single",
	 						refresh: true,
	 						fields: [
	 						    {field: "id", label: "ID", visible: true, width:"50px", sortable: {order:"asc"}},
	 						   {
	 						    	field: "loaiky", label: "Loại", visible: true, width:"50px",
	 			    	            foreignValueField: "value",
	 			    	            foreignTextField: "text",
	 			    	           foreignValues: [
	 					                	  {value: null,text: "Tất cả"},
	 					                	  {value: 1,text: "Tuần"},
	 					                	  {value: 2,text: "Tháng"},
	 					                	  {value: 3,text: "6 Tháng"},
	 					                	  {value: 4,text: "9 Tháng"},
	 					                	  {value: 5,text: "Năm"},
	 					                	 ],
	 						   },
	 						  {field: "ky", label: "Kỳ", visible: true, width:"50px"},
	 						   {field: "ma", label: "Số báo cáo", visible: true, width:"100px"},
	 						   {field: "nambaocao", label: "Năm báo cáo", visible: true, width:"150px"},
	 						   {field: "donvi", label: "Đơn vị", visible: true, width:"150px"},
	 						   {field: "ngaygui", label: "Gửi lúc", visible: true, width:"150px"},
	 						  {
	 			    	    	    field: "tinhtrang",
	 			    	    	    label: "Tình trạng",
	 			    	    	    foreignValues: tinhtrangbaocao,
	 			    	            foreignValueField: "value",
	 			    	            foreignTextField: "text",
	 			    	           width:"100px"
	 			    	    	 },
	 						  ],
	 						onRowClick: self.onRowClick
	 					});
	 				},
	 			});
	      	});
	      	
	      	if(!filterView.isEmptyFilter()){
	      		filterView.triggerFilter();
    		}
	    	
	    	return this;
    	},
    	onRowClick: function(event){
    		console.log(event);
    		if((event.rowId) && (event.rowData)){
    			var path = '';
    			if(event.rowData.loaiky == 1){
    				path = 'baocao/tuanmodel?id='+ event.rowId;
    			}
    			if(event.rowData.loaiky == 2){
    				path = 'baocao/thangmodel?id='+ event.rowId;
    			}
    			if(event.rowData.loaiky == 3){
    				path = 'baocao/6thangmodel?id='+ event.rowId;
    			}
    			if(event.rowData.loaiky == 4){
    				path = 'baocao/9thangmodel?id='+ event.rowId;
    			}
    			if(event.rowData.loaiky == 5){
    				path = 'baocao/nammodel?id='+ event.rowId;
    			}
    			console.log(path);
        		
        		this.getApp().getRouter().navigate(path);
        	}
    	}
    });

});