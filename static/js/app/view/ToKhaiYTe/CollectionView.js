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
        "donvi_id": {
            "type": "number"
        },
        "tendonvi": {
            "type": "string"
        },
        "cuakhau_id": {
            "type": "number"
        },
        "tencuakhau": {
            "type": "string"
        },
        "hoten": {
            "type": "string"
        },
        "cmtnd": {
            "type": "string"
        },
        "ngaykekhai": {
            "type": "datetime"
        }
	}
    var filtertemplate 				= require('text!tpl/ToKhaiYTe/filter.html');
    
    var FilterView = Gonrin.FilterView.extend({
        template : filtertemplate,
        bindings: "data-filter-bind",
    	modelSchema	: filterschema,
    	urlPrefix: "/api/v1/",
    	collectionName: "filter",
    	sesionKey : "danhsachtokhaiyte_",
    	uiControl:[
            {field:"ngaykekhai",  textFormat :"DD/MM/YYYY",}
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
            
            // var ngaykekhai = self.model.get("ngaykekhai");
            // if (!ngaykekhai){
            //     self.model.set("ngaykekhai", moment().startOf('day').format("YYYY-MM-DD"));
            // }
            this.applyBindings();

            self.model.on("change", function(){
                self.triggerFilter();
            });
            
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
            var self = this;
            
            
            var user = self.getApp().currentUser;
            if (user) {

                var donvi_id = null, tendonvi = null, cuakhau_id = null, tencuakhau = null;
                var info = user.info;
                

                var cuakhau = info.cuakhau;
                if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
                    cuakhau_id = cuakhau.id;
                    tencuakhau = cuakhau.ten;
                    // self.model.set({"cuakhau_id":cuakhau_id,"tencuakhau":cuakhau.ten});
                    
                }
                var donvi = info.donvi;
                if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
                    // self.model.set({"donvi_id":donvi.id,"tendonvi":donvi.ten})
                    donvi_id = donvi.id;
                    tendonvi = donvi.ten;
                }

                var defaultFilter = {"$and": []};

                if((user.hasRole("CuaKhauUser")) || (user.hasRole("DonViUser")) || (user.hasRole("DonViAdmin"))){
                	if (!!donvi_id) {
                        defaultFilter["$and"].push({ "donvi_id": { "$eq": donvi_id } });
                        
                        if (!!cuakhau_id) {
                            defaultFilter["$and"].push({ "cuakhau_id": { "$eq": cuakhau_id } });
                        }
                        
                    }
                }	

                

                var $filter = this.$el.find("#filter");
                var filterView = new FilterView({
                    el: $filter,
                    viewData:{
                        donvi_id: donvi_id,
                        tendonvi: tendonvi,
                        cuakhau_id: cuakhau_id,
                        tencuakhau: tencuakhau,
                    }
                });


                filterView.render();
              
                filterView.on('filterChanged', function(evt){
                    // self.doFilterChange(evt);
                    console.log(evt);
                    var $col = self.getCollectionElement();
                    // var defaultFilter = self.getDefaultFilter();

                    if($col){
                        var filters = {"$and":[]};

                        if(evt.data.id !== null){
                            filters["$and"].push({"id": {$likeI:evt.data.id}});
                        }

                        if(evt.data.ngaykekhai !== null){
                            filters["$and"].push({"ngaykekhai": {$eq:evt.data.ngaykekhai}});
                        }

                        if(evt.data.cmtnd !== null){
                            filters["$and"].push({"cmtnd": {$likeI:evt.data.cmtnd}});
                        }

                        if(evt.data.hoten !== null){
                            filters["$and"].push({"hoten": {$likeI:evt.data.hoten}});
                        }

                        if (!!$col.data('gonrin')){
                            $.each(defaultFilter["$and"], function(idx, obj){
                                filters["$and"].push(obj);
                            });

                            console.log(filters);

                            if (filters["$and"].length > 0){
                                $col.data('gonrin').filter(filters);
                            }else{
                                $col.data('gonrin').filter(null);
                            }
                        }
                    }
                });
                
                if(!filterView.isEmptyFilter()){
                    filterView.triggerFilter();
                }

                if (defaultFilter["$and"].length > 0){
                    this.uiControl.filters = defaultFilter;
                }

                this.applyBindings();
            }
            return this;
        },
        getDefaultFilter: function(){
            var self = this;
            var user = self.getApp().currentUser;
            
            return defaultFilter;
        },
        doFilterChange: function(evt){
            var self = this;
            var $col = self.getCollectionElement();
            var defaultFilter = self.getDefaultFilter();

            if($col){
                var filters = {"$and":[]};

                if(evt.data.id !== null){
                    filters["$and"].push({"id": {$likeI:evt.data.id}});
                }

                if(evt.data.ngaykekhai !== null){
                    filters["$and"].push({"ngaykekhai": {$eq:evt.data.ngaykekhai}});
                }

                if(evt.data.cmtnd !== null){
                    filters["$and"].push({"cmtnd": {$likeI:evt.data.cmtnd}});
                }

                if(evt.data.cmtnd !== null){
                    filters["$and"].push({"hoten": {$likeI:'%' + evt.data.hoten + '%'}});
                }

                if (!!$col.data('gonrin')){
                    $.each(defaultFilter["$and"], function(idx, obj){
                        filters["$and"].push(obj);
                    });

                    if (filters["$and"].length > 0){
                        $col.data('gonrin').filter(filters);
                    }else{
                        $col.data('gonrin').filter(null);
                    }
                }
            }
        }

    });

});