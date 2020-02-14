define(function (require) {
    "use strict";
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Gonrin				= require('gonrin');
    
    var template 			= require('text!tpl/CuaKhau/collection.html'),
    	schema 				= require('json!app/view/HeThong/CuaKhau/Schema.json');
    
    var seskey = "danhsachcuakhau_";
    
    var LoaiCuaKhauEnum = require('json!app/enum/LoaiCuaKhauEnum.json');
    var DonViSelectView = require('app/view/HeThong/DonVi/TreeSelectView');
    var TinhThanhSelectView = require('app/view/DanhMuc/TinhThanh/SelectView');
    
    var filterschema = {
			"tinhthanh": {
			    "type": "dict"
			},
			"tinhthanh_id": {
			    "type": "number"
			},
			"donvi_id": {
			    "type": "number"
			},
			"donvi": {
			    "type": "dict"
			},
			"ten": {
			    "type": "string"
			},
			"loaicuakhau": {
			    "type": "string"
			}
	}
    var filtertemplate 				= require('text!tpl/CuaKhau/filter.html');
    
    var FilterView = Gonrin.FilterView.extend({
    	template : filtertemplate,
    	modelSchema	: filterschema,
    	urlPrefix: "/api/v1/",
    	collectionName: "filter",
    	sesionKey : "danhsachcuakhau_",
    	uiControl:[
			{
			    field: "loaicuakhau",
			    uicontrol: "combobox",
			    dataSource: LoaiCuaKhauEnum,
				textField: "text",
				valueField: "value",
				selectionMode: "multiple",
				width: "250px"
			},
			{
				  field:"donvi",
				  uicontrol: "ref",
				  textField: "ten",
				  foreignRemoteField: "id",
				  foreignField: "donvi_id",
				  dataSource: DonViSelectView,
			},
			{
				  field:"tinhthanh",
				  uicontrol: "ref",
				  textField: "ten",
				  foreignRemoteField: "id",
				  foreignField: "tinhthanh_id",
				  dataSource: TinhThanhSelectView,
			},
    	],
    	render:function(){
    		var self = this;
    		this.getDataFromSession();
    		this.applyBindings();
    		var filterBtn = self.$el.find("#filterBtn");
    		filterBtn.unbind("click").bind("click", function(){
    			self.triggerFilter();
    		});
    		
    	},
    });
    
    return Gonrin.CollectionView.extend({
    	template : template,
    	modelSchema	: schema,
    	urlPrefix: "/api/v1/",
    	collectionName: "cuakhau",
    	tools: [
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
      		    	    	},
      		    	    	visible:function(){
      		    	    		return !((this.getApp().currentUser.hasRole("VienAdmin")) || (this.getApp().currentUser.hasRole("VienUser"))
      		    		      			|| (this.getApp().currentUser.hasRole("CuaKhauUser")));
      		    	    	}
      		    	    },
      		    	  {
      		    	    	name: "export",
      		    	    	type: "button",
      		    	    	buttonClass: "btn-warning btn-sm",
      		    	    	label: "Xuất excel",
      		    	    	command: function(){
      		    	    		var self = this;
      		    	    		var donvi_id = self.getApp().data(seskey + "donvi_id") || null;
      		    	    		var tinhthanh_id = self.getApp().data(seskey + "tinhthanh_id") || null;
      		    	    		var ten = self.getApp().data(seskey + "ten") || null;
      		    	    		var loaicuakhau = self.getApp().data(seskey + "loaicuakhau") || null;
      		    	    		
      		    	    		//console.log(self.getApp().data(seskey + "donvi") || null);
      		    	    		
      		    	    		var donvi = self.getApp().data(seskey + "donvi") || null;
      		    	    		
      		    	    		
      		    	    		
      		    	    		var data = {
      		    	    				donvi_id: null,
      		    	    				tinhthanh_id: tinhthanh_id,
      		    	    				ten: ten,
      		    	    				loaicuakhau: loaicuakhau
      		    	    		}
      		    	    		
      		    	    		if((donvi !== null) && (donvi.tuyendonvi ==2)){
    	    						data.donvi_id = donvi.children;
    	    					}else{
    	    						data.donvi_id = [donvi_id];
    	    					}
      		    	    		//window.open('/export/excel/baocao/' + params.rowData.id, '_blank');
      		    	    		var url = '/export/excel/cuakhau?filter=' + JSON.stringify(data);
      		    	    		window.open(url, '_blank');
      		    	    	}
      		    	    },
      					
          	    	]
          	    },
          	 ],
    	uiControl:{
    		fields: [
	    	     { 
	    	    	field: "id",label:"ID"
	    	     },
	    	     { field: "ma", label: "Mã"},
		     	 { field: "ten", label: "Tên"},
		     	 {
		     		field: "donvi_id", 
					label: "Đơn vị",
		     		foreign: "donvi",
		     		foreignValueField: "id",
		     		foreignTextField: "ten",
		     	 },
		     	 { 
		     		field: "tinhthanh_id", 
		     		label: "Tỉnh thành",
		     		foreign: "tinhthanh",
		     		foreignValueField: "id",
		     		foreignTextField: "ten",
		     	 },
		     	{ field: "kiemdichyte", label: "KDYT"},
		     	{ field: "phongcachly", label: "PCL"},
		     	{ field: "nguoilienlac", label: "Người liên lạc"},
		     	{ field: "sodienthoai", label: "Số điện thoại"},
		     	{ field: "diachi", visible:false},
		     	{ field: "email", visible:false},
		     	{ field: "thutu", visible:false},
		     	{ field: "duongbophu", visible:false},
		     	{ field: "duonghangkhong", visible:false},
		     	{ field: "duongthuyloai1", visible:false},
		     	{ field: "duongthuyloai2", visible:false},
		     	{ field: "duongboquocte", visible:false},
		     	{ field: "duongbochinh", visible:false},
		     	{ field: "duongsat", visible:false},
		     	{ field: "donvi", visible:false},
		     	{ field: "tinhthanh", visible:false},
		     	{ field: "quocgia_tiepgiap", visible:false},
		     	{ field: "cuakhau_tiepgiap", visible:false},
		     	
		     ],
		     pagination: {
		    	 showRowsInfo: true,
		     },
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
	    	 
	    	var $filter = this.$el.find("#filter");
	    	var filterView = new FilterView({el: $filter});
	    	 
	      	filterView.render();
	      	//var firstLoad = true;
	      	filterView.on('filterChanged', function(evt){
	      		
	    		var $col = self.getCollectionElement();
	    		if($col){
	    			if((evt.data.donvi_id !== null) || (evt.data.tinhthanh_id !== null) || (evt.data.ten !== null) || (evt.data.loaicuakhau !== null)){
	    				var filters = {"$and":[]};
	    				console.log(evt.data);
	    				if(evt.data.donvi_id !== null){
	    					if((evt.data.donvi !== null) && (evt.data.donvi.tuyendonvi ==2)){
	    						//var childs = evt.data.donvi.children;
	    						filters["$and"].push({"donvi_id":{"$in":evt.data.donvi.children}});
	    					}else{
	    						filters["$and"].push({"donvi_id":{"$eq":evt.data.donvi_id}});
	    					}
      						
      					}
	    				if(evt.data.tinhthanh_id !== null){
      						filters["$and"].push({"tinhthanh_id":{"$eq":evt.data.tinhthanh_id}});
      					}
	    				if(evt.data.ten !== null){
      						filters["$and"].push({"ten":{"$contains":evt.data.ten}});
      					}
	    				if((evt.data.loaicuakhau !== null)&&($.isArray(evt.data.loaicuakhau))&&(evt.data.loaicuakhau.length > 0)){
	    					var or = {"$or":[]};
		    	   			if(evt.data.loaicuakhau.indexOf(1) > -1){
		    	    			or["$or"].push({"duongboquocte":{"$eq":true}});
		    	    		};
		    	    		if(evt.data.loaicuakhau.indexOf(2) > -1){
		    	    			or["$or"].push({"duongbochinh":{"$eq":true}});
		    	    		};
		    	    		if(evt.data.loaicuakhau.indexOf(3) > -1){
		    	    			or["$or"].push({"duongbophu":{"$eq":true}});
		    	    		};
		    	    		if(evt.data.loaicuakhau.indexOf(4) > -1){
		    	    			or["$or"].push({"duongsat":{"$eq":true}});
		    	    		};
		    	    		if(evt.data.loaicuakhau.indexOf(5) > -1){
		    	    			or["$or"].push({"duonghangkhong":{"$eq":true}});
		    	    		};
		    	    		if(evt.data.loaicuakhau.indexOf(6) > -1){
		    	    			or["$or"].push({"duongthuyloai1":{"$eq":true}});
		    	    		};
		    	    		if(evt.data.loaicuakhau.indexOf(7) > -1){
		    	    			or["$or"].push({"duongthuyloai2":{"$eq":true}});
		    	    		};
		    	    		filters["$and"].push(or);
		    	    	}
	    				$col.data('gonrin').filter(filters);
	    			}else{
	    				$col.data('gonrin').filter(null);
	    			}
	    			
	    		}
	    		
	      	});
	      	//filterView.triggerFilter();
	      	if(!filterView.isEmptyFilter()){
	      		filterView.triggerFilter();
    		}
	      	
	      	if((this.getApp().currentUser.hasRole("DonViAdmin")) || (this.getApp().currentUser.hasRole("DonViUser"))
	      			|| (this.getApp().currentUser.hasRole("CuaKhauUser"))
	      	){
	      		this.$el.find("#filter").hide();
	      	}
	      	
	    	 return this;
    	},
    	
    });

});