define(function (require) {
    "use strict";
    var $ = require('jquery'),
        _ = require('underscore'),
        Gonrin = require('gonrin');

    var template = require('text!tpl/ToKhaiYTe/collection.html'),
        schema = require('json!app/view/ToKhaiYTe/ToKhaiYTeSchema.json'); 


    var filterschema = {
        "id": {
            "type": "string"
        },
        "hoten": {
            "type": "string"
        },
        "cmtnd": {
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
    var filtertemplate 				= require('text!tpl/ToKhaiYTe/filter.html');
    
    var FilterView = Gonrin.FilterView.extend({
    	template : filtertemplate,
    	modelSchema	: filterschema,
    	urlPrefix: "/api/v1/",
    	collectionName: "filter",
    	sesionKey : "danhsachtokhaiyte_",
    	uiControl:[
			// {
			//     field: "loaicuakhau",
			//     uicontrol: "combobox",
			//     dataSource: LoaiCuaKhauEnum,
			// 	textField: "text",
			// 	valueField: "value",
			// 	selectionMode: "multiple",
			// 	width: "250px"
			// },
			// {
			// 	  field:"donvi",
			// 	  uicontrol: "ref",
			// 	  textField: "ten",
			// 	  foreignRemoteField: "id",
			// 	  foreignField: "donvi_id",
			// 	  dataSource: DonViSelectView,
			// },
			// {
			// 	  field:"tinhthanh",
			// 	  uicontrol: "ref",
			// 	  textField: "ten",
			// 	  foreignRemoteField: "id",
			// 	  foreignField: "tinhthanh_id",
			// 	  dataSource: TinhThanhSelectView,
			// },
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
        template: template,
        modelSchema: schema,
        urlPrefix: "/api/v1/",
        collectionName: "tokhaiyte",
        uiControl: {
            fields: [
                { field: "id", label: "Mã tờ khai"},
                { field: "hoten", label: "Họ tên"},
                // { field: "matokhaiyte", label: "Mã tờ khai" },
                { field: "cmtnd", label: "CMTND/Hộ chiếu", visible: false },
                { field: "quoctich", label: "Quốc tịch"  },
                { field: "namsinh", label: "Năm sinh"},
                { field: "ngaykekhai", label: "Ngày kê khai" },
                { field: "ngon_ngu", label: "Ngôn ngữ" },

                { field: "donvi_id", visible: false },
                { field: "tendonvi", visible: false },
                { field: "madonvi", visible: false },
                { field: "cuakhau_id", visible: false },
                { field: "tencuakhau", visible: false },
                { field: "macuakhau", visible: false },
                { field: "canbo_id", visible: false },
                { field: "tencanbo", visible: false },
                { field: "emailcanbo", visible: false },
                
                { field: "gioitinh", visible: false },
                
                { field: "thongtindilai_taubay", visible: false },
                { field: "thongtindilai_tauthuyen", visible: false },
                { field: "thongtindilai_oto", visible: false },
                { field: "thongtindilai_khac", visible: false },
                { field: "thongtindilai_chitiet", visible: false },
                { field: "sohieu_phuongtien", visible: false },
                { field: "soghe_phuongtien", visible: false },
                { field: "ngay_khoihanh", visible: false },

                { field: "ngay_nhapcanh", visible: false },
                { field: "noi_khoihanh", visible: false },
                { field: "noiden", visible: false },
                { field: "quocgiadiqua", visible: false },
                { field: "diachi_taivietnam", visible: false },
                { field: "sodienthoai", visible: false },
                { field: "email", visible: false },
                { field: "dauhieubenh_sot", visible: false },

                { field: "dauhieubenh_ho", visible: false },
                { field: "dauhieubenh_khotho", visible: false },
                { field: "dauhieubenh_dauhong", visible: false },
                { field: "dauhieubenh_buonnon", visible: false },
                { field: "dauhieubenh_tieuchay", visible: false },
                { field: "dauhieubenh_xuathuyetngoaida", visible: false },
                { field: "dauhieubenh_phatban", visible: false },


                { field: "vacxin_dasudung", visible: false },
                { field: "tiepxuc_dongvat", visible: false },
                { field: "chamsocnguoibenhtruyennhiem", visible: false },
                { field: "ngaygio_phathien", visible: false },
                { field: "tinhtrang", visible: false },
                { field: "huongxutri", visible: false },
                { field: "cachlytaptrung", visible: false },
                { field: "trangthai", visible: false },

                { field: "note", visible: false },
                { field: "extra_data", visible: false },



            ],
            onRowClick: function (event) {
                if (event.rowId) {
                    var path = this.collectionName + '/model?id=' + event.rowId;
                    this.getApp().getRouter().navigate(path);
                }
            }
        },
        render: function () {
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
            
            this.applyBindings();
            console.log(this.collection)
            return this;
        },

    });

});