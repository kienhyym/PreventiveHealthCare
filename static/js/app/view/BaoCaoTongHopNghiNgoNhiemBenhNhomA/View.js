define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/BaoCaoTongHopNghiNgoNhiemBenhNhomA/view.html'),
        // schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/Schema.json');
        schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/DonViSchema.json');

    // var BaoCaoNghiNgoNhiemBenhDialogView = require('app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhDialogView');
	var BaoCaoNghiNgoNhiemBenhCollectionlView = require('app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhCollectionlView');
	var CuaKhauItemView = require('app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/CuaKhauItemView');
    var DonViSelectView = require('app/view/HeThong/DonVi/TreeSelectView');
    var DiaDiemCachLyTapTrungView = require('app/view/DiaDiemCachLyTapTrung/CollectionView');
	// var TruongHopCachLyDialogView = require('app/view/TruongHopCachLyTapTrung/DialogView');
	var TruongHopCachLyTapTrungCollectionView = require('app/view/TruongHopCachLyTapTrung/CollectionView');
	
	
    var Model = Gonrin.Model.extend({
		defaults: Gonrin.getDefaultModel(schema),
		computeds: {
			donvi: {
				deps: ["donvi_id", "tendonvi"],
				get: function( donvi_id, tendonvi ) {
					return {
						"id": donvi_id,
						"ten": tendonvi,
						};
				},
				set: function( obj ) {
					return {donvi_id: obj.id, tendonvi: obj.ten};
				}
			},
		},
		urlRoot : "/api/v1/baocaotonghopnghingonhiembenhnhoma"
    });
    

    return Gonrin.ModelView.extend({
		template: template,
        modelSchema: schema,
        modelClass: Model,
		urlPrefix: "/api/v1/",
		collectionName: "baocaotonghopnghingonhiembenhnhoma",
		tools : [
		    	    {
		    	    	name: "defaultgr",
		    	    	type: "group",
		    	    	groupClass: "toolbar-group",
		    	    	buttons: [
							{
								name: "back",
								type: "button",
								buttonClass: "btn-default btn-sm",
								label: "TRANSLATE:BACK",
								command: function(){
									var self = this;
					                self.getApp().getRouter().navigate("thongkenghingonhiembenhnhoma");
								}
							},
							{
				    	    	name: "save",
				    	    	type: "button",
				    	    	buttonClass: "btn-success btn-sm",
				    	    	label: "TRANSLATE:SAVE",
				    	    	command: function(){
                                    var self = this;
                                    var data = self.model.toJSON();

                                    
                                    var url = self.getApp().serviceURL + '/api/v1/baocaotonghopnghingonhiembenhnhoma/donvi';
                                    $.ajax({
                                        url: url,
                                        method: "POST",
                                        data: JSON.stringify(data),
                                        contentType: "application/json",
                                        success: function (data) {
                                            console.log(data);
                                            self.getData();
                                        },
                                        error: function (xhr, status, error) {
                                            try {
                                                if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
                                                    self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
                                                    self.getApp().getRouter().navigate("login");
                                                } else {
                                                    self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
                                                }
                                            }
                                            catch (err) {
                                                self.getApp().notify({ message: "Lỗi truy cập dữ liệu, vui lòng thử lại sau"}, { type: "danger", delay: 1000 });
                                            }
                                        },
                                    });
                                
				                    // self.model.save(null,{
				                    //     success: function (model, respose, options) {
				                    //         self.getApp().notify("Save successfully");
				                    //         self.getApp().getRouter().navigate("baocaotonghopnghingonhiembenhnhoma/collection");
				                    //     },
				                    //     error: function (model, xhr, options) {
				                    //         self.getApp().notify('Save error, Xin kiểm tra trùng ngày lập báo cáo');
				                    //     }
				                    // });
				    	    	}
							}
		    	    	]
                    },
                    {
                    	name : "thongkegr",
                    	type : "group",
                    	groupClass : "toolbar-group",
                    	buttons : [ {
                    		name : "thongke",
                    		type : "button",
                    		buttonClass : "btn-default btn-sm btn-primary",
                    		label : "Thống kê",
                    		command : function() {
                                var self = this;
                    			self.getApp().getRouter().navigate("thongkenghingonhiembenhnhoma");
                    		}
                    	}]
                    },
                    


					// {
					// 	name : "exportgr",
					// 	type : "group",
					// 	groupClass : "toolbar-group",
					// 	buttons : [ {
					// 		name : "excel",
					// 		type : "button",
					// 		buttonClass : "btn-default btn-sm btn-primary",
					// 		label : "Xuất Excel",
					// 		command : function() {
					// 			var id = this.model.get("id"); 
					// 			var url = "/export/excel/baocaotonghopnghingonhiembenhnhoma/" + id;
					// 			 window.open(url, "_blank");
					// 		},
					// 		visible: function(){
					// 			var id =  this.getApp().getRouter().getParam("id");
					// 			console.log(id, id !== null, "visible");
					// 			return (id !== null);
					// 			// return true;
					// 		}
					// 	}]
					// },
		    	],
		uiControl: [
			{field:"ngaybaocao",  textFormat :"DD/MM/YYYY", disabledComponentButton: false},
            {
                field: "cuakhau_data",
                uicontrol: false,
                itemView: CuaKhauItemView,
            },
            {
				field:"donvi",
				uicontrol:"ref",
				textField: "ten",
				dataSource: DonViSelectView,
			},
		],
		render: function () {
            var self = this;
            var user = self.getApp().currentUser;
            self.$el.find(".duonghangkhong").hide();
			self.$el.find(".loaibaocao").hide();
            if (user) {
                // console.log
                // user.hasRole("DonViUser");
                //return this.checkHasRole("Admin") || this.checkHasRole("VienAdmin")|| this.checkHasRole("VienUser") ||
                        // this.checkHasRole("DonViAdmin") || this.checkHasRole("DonViUser");
                if(!user.hasRole("Admin")){
                    for(var i = 0; i < self.uiControl.length; i++){
                        if (self.uiControl[i].field == "donvi"){
                            self.uiControl[i].readonly = true;
                            break;
                        }
                    }
                }
                var info = user.info;
                
                var donvi = info.donvi;
                if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
                    self.model.set({"donvi_id":donvi.id,"tendonvi":donvi.ten})
                }

                self.model.set({"ngaybaocao": moment().startOf('day').format("YYYY-MM-DD"),"loaibaocao":2});
                
                self.applyBindings();
                // self.$el.find("#ngaybaocao").val(moment().startOf('day').format("YYYY-MM-DD"));
                self.registerEvent();
				// self.getDanhsachnhiembenh();
				self.getDanhSachNghiNgo();
				self.getDanhSachCachLy();
                self.getData();
                self.getDiaDiemCachLyTapTrung();
                
            }
		},
		checkRole: function(role) {
			var ret = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole(role): false;
			return ret;
		},
		registerEvent: function(){
            var self = this;
            

			self.model.on("change:ngaybaocao change:donvi_id",function () {
				// self.getDanhsachnhiembenh();
				self.getDanhSachNghiNgo();
				self.getDanhSachCachLy();
                self.getData();
            });

		},
		// validate: function() {
		// 	var self = this;
		// 	var ngaybaocao = self.model.get("ngaybaocao");
		// 	if(!ngaybaocao) {
		// 		self.getApp().notify('Vui lòng điền ngày báo cáo');
		// 		return false;
		// 	}
		// 	return true;
        // },
        
        getData: function(){
            var self = this;
            var donvi_id  = self.model.get("donvi_id");
            var ngaybaocao  = self.model.get("ngaybaocao");

            if(!donvi_id){
				self.getApp().notify('Xin mời chọn đơn vị');
				// self.applyBindings();
				return;
			}
            
            //var cuakhau_id  = self.model.get("cuakhau_id");

            //clear data
            self.$el.find("#list-cuakhau-data").empty();
            self.model.set("songuoidangcachlytaptrung", null);
            // self.model.set("songuoidangcachlytaptrung_cotrieuchung", null);
            // self.model.set("songuoihetcachly", null);

            var param = {
                "ngaybaocao": ngaybaocao,
                "donvi_id": donvi_id
            }
            var url = self.getApp().serviceURL + '/api/v1/baocaotonghopnghingonhiembenhnhoma/donvi';
            $.ajax({
			    url: url,
				method: "GET",
				data: param,
				contentType: "application/json",
				success: function (data) {
                    console.log(data);
                    self.model.set(data);
                    self.applyBindings();
				},
				error: function (xhr, status, error) {
					try {
						if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
							self.getApp().getRouter().navigate("login");
						} else {
							self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
						}
					}
					catch (err) {
						self.getApp().notify({ message: "Lỗi truy cập dữ liệu, vui lòng thử lại sau"}, { type: "danger", delay: 1000 });
					}
				},
			});
        },

        getDiaDiemCachLyTapTrung: function(){
			var self = this;
			var view = new DiaDiemCachLyTapTrungView({
				viewData: {
                    // disable_create: true,
					donvi_id : self.model.get("donvi_id"),
					// cuakhau_id : self.model.get("cuakhau_id")
				}
			});
			view.render();
			self.$el.find("#diadiemcachly-container").append(view.$el)
		},



		// createNguoiNhiemBenh: function() {
		// 	var self = this;
			
		// 	var dialogNghiNgonhiemBenh = new BaoCaoNghiNgoNhiemBenhDialogView();
		// 	dialogNghiNgonhiemBenh.dialog({size: "large"});
		// 	dialogNghiNgonhiemBenh.on("close", function (param) {
		// 		console.log("dialogNghiNgonhiemBenh close", param);
		// 		if ((!!param) && (param.refresh)){
					
		// 			self.getDanhsachnhiembenh();
		// 		}
				
		// 	});
		// },
		getDanhSachCachLy: function(){
			var self = this;
			var ngaybaocao = self.model.get("ngaybaocao");
			var donvi_id = self.model.get("donvi_id");
			var cuakhau_id = self.model.get("cuakhau_id");

			if((!donvi_id) || (!ngaybaocao)){
				return;
			}

			self.$el.find("#danhsach-cachly-container").empty();

			var self = this;
			var view = new TruongHopCachLyTapTrungCollectionView({
				viewData: {
					"type": "donvi",
					ngaybaocao : ngaybaocao,
					donvi_id : donvi_id,
				}
			});
			view.render();
			self.$el.find("#danhsach-cachly-container").append(view.$el)
		},
		getDanhSachNghiNgo: function(){
			var self = this;
			var ngaybaocao = self.model.get("ngaybaocao");
			var donvi_id = self.model.get("donvi_id");
			// var cuakhau_id = self.model.get("cuakhau_id");

			if((!donvi_id) || (!ngaybaocao)){
				return;
			}

			self.$el.find("#danhsach-nghingo-container").empty();

			var self = this;
			var view = new BaoCaoNghiNgoNhiemBenhCollectionlView({
				viewData: {
					"type": "itemview",
					ngaybaocao : ngaybaocao,
					donvi_id : donvi_id,
				}
			});
			view.render();
			self.$el.find("#danhsach-nghingo-container").append(view.$el);
		},

		getDanhsachnhiembenh:function(){
            var self = this;
            var ngaybaocao = self.model.get("ngaybaocao");
			var donvi_id = self.model.get("donvi_id");
            // console.log(ngaybaocao, donvi_id, cuakhau_id);
            
            if((!donvi_id) || (!ngaybaocao)){
				return;
            }

			self.$el.find("#add-nghingonhiembenh-item").empty();
			var url_danhsachnghingo = self.getApp().serviceURL + '/api/v1/baocaonghingonhiembenh';
            
            var filterparams = {
                "$and":[
                    {"ngaybaocao":{"$eq":ngaybaocao}},
                    {"donvi_id": {"$eq":donvi_id}},
                    // {"cuakhau_id": {"$eq":cuakhau_id}}
                ]
            }

            // if (!!cuakhau_id){
            //     filterparams["$and"].push({"cuakhau_id": {"$eq":cuakhau_id}});
            // }
            
            $.ajax({
			    url: url_danhsachnghingo,
				method: "GET",
				data: {
					"q": JSON.stringify({
						"filters": filterparams,
					// "page":1
					})
				},
				contentType: "application/json",
				success: function (data) {
					self.$el.find("#add-nghingonhiembenh-item").grid({
						showSortingIndicator: true,
						onValidateError: function(e){
							console.log(e);
						},
						language:{
							no_records_found:" "
						},
						noResultsClass:"alert alert-default no-records-found",
						refresh:true,
						orderByMode: "client",
						tools : [
							{
								name: "create",
								type: "button",
								buttonClass: "btn-danger btn-sm",
								label: "Thêm trường hợp nghi ngờ",
								command: function() {
									// self.createNguoiNhiemBenh();

									var path =  'baocaonghingonhiembenh/model';
									gonrinApp().getRouter().navigate(path);
								}
							},
							
							// {
							// 	name: "export_excel",
							// 	type: "button",
							// 	buttonClass: "btn-primary btn-sm",
							// 	label: "Xuất Excel danh sách",
							// 	command: function() {
							// 		var ngaybaocao = self.model.get("ngaybaocao");
							// 		var url = "/export/excel/baocaotonghopnghingonhiembenhnhoma";
									
							// 		if(!!ngaybaocao){
							// 			url = "/export/excel/baocaotonghopnghingonhiembenhnhoma?ngaybaocao=" + ngaybaocao;
							// 		}
							// 		window.open(url, "_blank");
							// 	}
							// },
						],
						fields: [
							{
								field: "id", label: "ID", width: 100, readonly: true,visible:false
							},
							{field: "hoten", label: "Họ và tên", sortable: {order:"asc"},width: 400},
							{field: "namsinh", label: "Năm sinh", width: 200},
							{field: "quoctich", label: "Quốc tịch", width: 200},
							{ field: "noio", label: "Nơi ở tại Việt Nam (Nơi sẽ đến)", width: 250 },
							{ field: "ngaygio_phathien", label: "Ngày giờ phát hiện", width: 250 },
							{ field: "tiensu_trieuchunglamsang", label: "Tình trạng phát hiện", width: 250, textField: "ten" },
							{ 
								field: "huongxutri", 
								label: "Hướng xử trí",
								foreignValues: [
									{value: "khuyencaoyte", text: "Khuyến cáo y tế"},
									{value: "cachly", text: "Cách ly"},
									{value: "chuyencosoyte", text: "Chuyển cơ sở y tế"},
									{value: "tamdungnhapcanh", text: "Tạm dừng nhập cảnh"},
									{value: "khac", text: "Khác"},
								],
								foreignValueField: "value",
								foreignTextField: "text",
							},
							{ field: "tiensu_xutri", label: "Xử trí", width: 250 },
						],
						dataSource: data.objects,
						primaryField:"id",
						selectionMode: "single",
						pagination: {
							// page: 1,
							showRowsInfo: true,
							pageSize: 20
						},
						onRowClick: function(event){
							if (event.rowId) {
								var path =  'baocaonghingonhiembenh/model?id=' + event.rowId;
								gonrinApp().getRouter().navigate(path);
							}
						},
					});
				},
				error: function (xhr, status, error) {
					try {
						if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
							self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
							self.getApp().getRouter().navigate("login");
						} else {
							self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
						}
					}
					catch (err) {
						self.getApp().notify({ message: "Lỗi truy cập dữ liệu, vui lòng thử lại sau"}, { type: "danger", delay: 1000 });
					}
				},
			});
		}
		
	});

});