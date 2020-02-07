define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/BaoCao/timkiembaocaock.html'),
    	schema 				= require('json!app/view/BaoCao/Schema.json');
    
    var tinhtrangbaocao 	= require('json!app/enum/TinhTrangBaocaoEnum.json');
    
    var DonViSelectView = require('app/view/HeThong/DonVi/TreeSelectView');
    var CuaKhauSelectView = require('app/view/HeThong/CuaKhau/SelectView');
    
    var isCuaKhau = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole('CuaKhauUser'): false;
    var donviObj = null; var cuakhauObj = null;
    if(isCuaKhau){
    	donviObj = {ten: gonrinApp().currentUser.info.donvi.ten, id: gonrinApp().currentUser.info.donvi.id};
    	cuakhauObj = {ten: gonrinApp().currentUser.info.cuakhau.ten, id: gonrinApp().currentUser.info.cuakhau.id};
    }
    
    //console.log(isCuaKhau);
    
    var filtertemplate 			= require('text!tpl/BaoCao/timkiembaocaock_filter.html');
    var filterschema = {
			"donvi_id": {
			    "type": "number"
			},
			"donvi": {
			    "type": "dict"
			},
			"cuakhau_id": {
			    "type": "number"
			},
			"cuakhau": {
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
    	sesionKey : "timkiembaocaock_",
    	uiControl:[
			{
				  field:"donvi",
				  uicontrol: "ref",
				  textField: "ten",
				  foreignRemoteField: "id",
				  foreignField: "donvi_id",
				  dataSource: DonViSelectView,
				  readonly: isCuaKhau
			},
			{
				  field:"cuakhau",
				  uicontrol: "ref",
				  textField: "ten",
				  foreignRemoteField: "id",
				  foreignField: "cuakhau_id",
				  dataSource: CuaKhauSelectView,
				  readonly: isCuaKhau
			},
			{
				  field:"loaikybaocao",
				  uicontrol: "combobox",
				  dataSource: [
	                	  {value: null,text: "Tất cả"},
	                	  {value: 1,text: "Tuần"},
	                	  {value: 2,text: "Tháng"},
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
    		if(isCuaKhau){
    			self.model.set("donvi", donviObj);
    			self.model.set("donvi_id", donviObj.id);
    			self.model.set("cuakhau", cuakhauObj);
    			self.model.set("cuakhau_id", cuakhauObj.id);
    			self.$el.find("#donvi").hide();
    			self.$el.find("#cuakhau").hide();
    		}
    		if(self.model.get("nam") === null){
    			self.model.set("nam", moment().year());
    		}
    		this.applyBindings();
    		var filterBtn = self.$el.find("#filterBtn");
    		
    		//set filter when donvi_ is not null.
    		
    		var $donviEl = self.getFieldElement("donvi");
    		var $cuakhauEl = self.getFieldElement("cuakhau");
    		if($donviEl){
    			$donviEl.off("change.gonrin").on('change.gonrin', function(e){
                	//console.log($('#combobox3').data('gonrin').getValue());
    				var donvi = $donviEl.data('gonrin').getValue();
    				if(donvi){
    					$cuakhauEl.data('gonrin').setFilters({"donvi_id": {"$eq": donvi.id}})
    				}else{
    					$cuakhauEl.data('gonrin').setFilters(false);
    				}
    				
                });
    		}
    		//console.log($donviEl);
    		
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
	    	var self = this;
	    	this.applyBindings();
	    	var $filter = this.$el.find("#filter");
	    	var filterView = new FilterView({el: $filter});
	      	filterView.render();
	      	filterView.on('filterChanged', function(evt){
	      		var donvi_id = evt.data.donvi_id;
	      		var cuakhau_id = evt.data.cuakhau_id;
	    		var loaiky = evt.data.loaikybaocao;
	    		var tinhtrang = evt.data.tinhtrang;
	    		var thang = evt.data.thang;
	    		var nam = evt.data.nam;
	    		var loaibaocao = 2; //baocaodon vi
	    		
	    		var url = "/api/v1/timkiembaocao";
	    		//ajax
	    		$.ajax({
	 				url: url,
	 				data: {nam:nam, donvi_id:donvi_id,cuakhau_id:cuakhau_id,thang:thang, loaibaocao: loaibaocao, loaiky: loaiky, tinhtrang: tinhtrang},
	 				dataType: "json",
	 				contentType: "application/json",
	 				success: function(data) {
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
	 						  {field: "cuakhau", label: "Cửa khẩu", visible: true, width:"150px"},
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
    		if((event.rowId) && (event.rowData)){
    			var path = '';
    			if(event.rowData.loaiky == 1){
    				path = 'baocao/tuanmodel?id='+ event.rowId;
    			}
    			if(event.rowData.loaiky == 2){
    				path = 'baocao/thangmodel?id='+ event.rowId;
    			}
        		
        		this.getApp().getRouter().navigate(path);
        	}
    	}
    });

});