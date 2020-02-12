define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/BaoCaoTongHopNghiNgoNhiemBenhNhomA/model.html'),
		schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/Schema.json');

    var BaoCaoNghiNgoNhiemBenhDialogView = require('app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhDialogView');
	// var TruongHopCachLyDialogView = require('app/view/TruongHopCachLyTapTrung/DialogView');
	var CuaKhauSelectView = require('app/view/HeThong/CuaKhau/SelectView');

	var DiaDiemCachLyTapTrungView = require('app/view/DiaDiemCachLyTapTrung/CollectionView');
	var TruongHopCachLyTapTrungCollectionView = require('app/view/TruongHopCachLyTapTrung/CollectionView');
	
	
	var ChiTieuNCoVView = require('app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/ChiTieuNCoVView');


	var Model = Gonrin.Model.extend({
		defaults: Gonrin.getDefaultModel(schema),
		computeds: {
			cuakhau: {
				deps: ["cuakhau_id", "tencuakhau"],
				get: function( cuakhau_id, tencuakhau ) {
					return {
						"id": cuakhau_id,
						"ten": tencuakhau,
						};
				},
				set: function( obj ) {
					return {cuakhau_id: obj.id, tencuakhau: obj.ten};
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
					                self.getApp().getRouter().navigate("index");
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

                                    
                                    var url = self.getApp().serviceURL + '/api/v1/baocaotonghopnghingonhiembenhnhoma/cuakhau';
                                    $.ajax({
                                        url: url,
                                        method: "POST",
                                        data: JSON.stringify(data),
                                        contentType: "application/json",
                                        success: function (data) {
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
				    	    	}
							}
		    	    	]
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
				field:"cuakhau",
				uicontrol:"ref",
				textField: "ten",
				dataSource: CuaKhauSelectView,
			},
			{
				field: "data",
				uicontrol:false,
				itemView: ChiTieuNCoVView,
			}

		],
		render: function () {
            var self = this;
            var user = self.getApp().currentUser;
            if (user) {
				var info = user.info;
				if(user.hasRole("CuaKhauUser")){
					for(var i = 0; i < self.uiControl.length; i++){
						if (self.uiControl[i].field == "cuakhau"){
							self.uiControl[i].readonly = true;
							break;
						}
					}
				}	

				var cuakhau = info.cuakhau;
				if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
					self.model.set({"cuakhau_id":cuakhau.id,"tencuakhau":cuakhau.ten,"macuakhau":cuakhau.ma});
					
				}
				var donvi = info.donvi;
				if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
					self.model.set({"donvi_id":donvi.id,"tendonvi":donvi.ten})
				}

				//self.model.set("ngaybaocao", moment().startOf('day').unix());
				//self.model.set("ngaybaocao", moment().startOf('day').format("YYYY-MM-DDTHH:mm"));
				
				self.model.set({"ngaybaocao": moment().startOf('day').format("YYYY-MM-DD"),"loaibaocao":2});
				
				self.applyBindings();
				self.registerEvent();
				self.getDanhsachnhiembenh();
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
			
			self.model.on("change:ngaybaocao change:cuakhau_id",function () {
				self.getDanhsachnhiembenh();
				self.getDanhSachCachLy();
				self.getData();
			});


			//comment other ncov
			self.model.on("change:data",function () {
				console.log(self.model.toJSON());
				var data = self.model.get("data");
				if(!!data){
					if(data.record_type === "nCoV"){
						var ret = 0;
						var quoctich_vietnam = (data.quoctich_vietnam || null) != null ? data.quoctich_vietnam: 0;
						var quoctich_trungquoc = (data.quoctich_trungquoc || null) != null ? data.quoctich_trungquoc: 0;
						var quoctich_khac = (data.quoctich_khac || null) != null ? data.quoctich_khac: 0;
						self.model.set("songuoidangcachlytaptrung", quoctich_vietnam + quoctich_trungquoc + quoctich_khac);
					}
				}
			});
		},

		getData: function(){
            var self = this;
            var donvi_id  = self.model.get("donvi_id");
            var ngaybaocao  = self.model.get("ngaybaocao");
			var cuakhau_id  = self.model.get("cuakhau_id");

            //clear data
            self.model.set("songuoinhapcanh", null);
            self.model.set("sohanhkhachkhaibao", null);
            self.model.set("sochuyenbay", null);
            self.model.set("songuoinghingo", null);

			if(!cuakhau_id){
				self.getApp().notify('Xin mời chọn cửa khẩu');
				// self.applyBindings();
				return;
			}

            var param = {
                "ngaybaocao": ngaybaocao,
				"donvi_id": donvi_id,
				"cuakhau_id": cuakhau_id
            }
            var url = self.getApp().serviceURL + '/api/v1/baocaotonghopnghingonhiembenhnhoma/cuakhau';
            $.ajax({
			    url: url,
				method: "GET",
				data: param,
				contentType: "application/json",
				success: function (data) {
					data["data"] = data["data"] || null;
					self.model.set(data);
					self.$el.find("#data-container").empty();
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
			self.$el.find("#diadiemcachly-container").empty();
			var view = new DiaDiemCachLyTapTrungView({
				viewData: {
					donvi_id : self.model.get("donvi_id"),
					cuakhau_id : self.model.get("cuakhau_id")
				}
			});
			view.render();
			self.$el.find("#diadiemcachly-container").append(view.$el)
		},

		// createTruongHopCachLy: function() {
		// 	var self = this;
			
		// 	var view = new TruongHopCachLyDialogView();
		// 	view.dialog({size: "large"});
		// 	view.on("close", function (param) {
		// 		if ((!!param) && (param.refresh)){
					
		// 			self.getDanhSachCachLy();
		// 		}
				
		// 	});
		// },
		getDanhSachCachLy: function(){
			var self = this;
			var ngaybaocao = self.model.get("ngaybaocao");
			var donvi_id = self.model.get("donvi_id");
			var cuakhau_id = self.model.get("cuakhau_id");

			if((!cuakhau_id) || (!donvi_id) || (!ngaybaocao)){
				return;
			}

			self.$el.find("#danhsach-cachly-container").empty();

			var self = this;
			var view = new TruongHopCachLyTapTrungCollectionView({
				viewData: {
					ngaybaocao : ngaybaocao,
					donvi_id : donvi_id,
					cuakhau_id : cuakhau_id
				}
			});
			view.render();
			self.$el.find("#danhsach-cachly-container").append(view.$el)


			// var url = self.getApp().serviceURL + '/api/v1/truonghopcachlytaptrung';
			
			// $.ajax({
			// 	url: url,
			// 	method: "GET",
			// 	data: {
			// 		"q": JSON.stringify({
			// 			"filters": {
			// 				"$and":[
			// 					{"ngaybaocao":{"$eq":ngaybaocao}},
			// 					{"donvi_id": {"$eq":donvi_id}},
			// 					{"cuakhau_id": {"$eq":cuakhau_id}}
			// 				]
			// 			},
			// 		// "page":1
			// 		})
			// 	},
			// 	contentType: "application/json",
			// 	success: function (data) {
			// 		self.$el.find("#danhsach-cachly-container").grid({
			// 			showSortingIndicator: true,
			// 			onValidateError: function(e){
			// 				console.log(e);
			// 			},
			// 			language:{
			// 				no_records_found:" "
			// 			},
			// 			noResultsClass:"alert alert-default no-records-found",
			// 			refresh:true,
			// 			orderByMode: "client",
			// 			tools : [
			// 				{
			// 					name: "create-cachly",
			// 					type: "button",
			// 					buttonClass: "btn-danger btn-sm",
			// 					label: "Thêm trường hợp cách ly tập trung",
			// 					command: function() {
			// 						self.createTruongHopCachLy();
			// 					}
			// 				},

			// 				// {
			// 				// 	name: "export_excel",
			// 				// 	type: "button",
			// 				// 	buttonClass: "btn-primary btn-sm",
			// 				// 	label: "Xuất Excel danh sách cách ly",
			// 				// 	command: function() {
			// 				// 		var ngaybaocao = self.model.get("ngaybaocao");
			// 				// 		//var url = "/export/excel/baocaongonhiembenhnhom";
									
			// 				// 		if(!!ngaybaocao){
			// 				// 			var url = "/export/excel/baocaotonghopnghingonhiembenhnhoma?ngaybaocao=" + ngaybaocao + "&cachly=1";
			// 				// 			window.open(url, "_blank");
			// 				// 		}
									
			// 				// 	}
			// 				// },
			// 			],
			// 			fields: [
			// 				{
			// 					field: "id", label: "ID", width: 100, readonly: true,visible:false
			// 				},
			// 				{field: "hoten", label: "Họ và tên", sortable: {order:"asc"},width: "150px"},
			// 				{field: "namsinh", label: "Năm sinh"},
			// 				{field: "quoctich", label: "Quốc tịch"},
			// 				{ field: "noio", label: "Nơi ở tại Việt Nam (Nơi sẽ đến)"},
			// 				{ field: "ngaygio_phathien", label: "Ngày giờ phát hiện"},
			// 				{ field: "tinhtrang_phathien", label: "Tình trạng phát hiện", textField: "ten" },
			// 				{ field: "tiensu_xutri", label: "Xử trí"},
			// 			],

			// 			dataSource: data.objects,
			// 			primaryField:"id",
			// 			selectionMode: "single",
			// 			pagination: {
			// 				// page: 1,
			// 				pageSize: 20,
			// 				showRowsInfo: true,
			// 			},
			// 			onRowClick: function(event){
			// 				// if (event.rowId) {
			// 				// 	var path =  'baocaonghingonhiembenh/model/model?id=' + event.rowId;
			// 				// 	gonrinApp().getRouter().navigate(path);
			// 				// }
			// 			},
			// 		});
			// 	},
			// 	error: function (xhr, status, error) {
			// 		try {
			// 			if (($.parseJSON(xhr.responseText).error_code) === "SESSION_EXPIRED"){
			// 				self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
			// 				self.getApp().getRouter().navigate("login");
			// 			} else {
			// 				self.getApp().notify({ message: $.parseJSON(xhr.responseText).error_message }, { type: "danger", delay: 1000 });
			// 			}
			// 		}
			// 		catch (err) {
			// 			self.getApp().notify({ message: "Lỗi truy cập dữ liệu, vui lòng thử lại sau"}, { type: "danger", delay: 1000 });
			// 		}
			// 	},
			// });
		},
		getDanhsachnhiembenh:function(){
			var self = this;
			var ngaybaocao = self.model.get("ngaybaocao");
			var donvi_id = self.model.get("donvi_id");
			var cuakhau_id = self.model.get("cuakhau_id");

			if((!cuakhau_id) || (!donvi_id) || (!ngaybaocao)){
				return;
			}

			self.$el.find("#add-nghingonhiembenh-item").empty();
			var url_danhsachnghingo = self.getApp().serviceURL + '/api/v1/baocaonghingonhiembenh';
			
			$.ajax({
				url: url_danhsachnghingo,
				method: "GET",
				data: {
					"q": JSON.stringify({
						"filters": {
							"$and":[
								{"ngaybaocao":{"$eq":ngaybaocao}},
								{"donvi_id": {"$eq":donvi_id}},
								{"cuakhau_id": {"$eq":cuakhau_id}}
							]
						},
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
								buttonClass: "btn-warning btn-sm",
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
							// 	label: "Xuất Excel danh sách cách ly",
							// 	command: function() {
							// 		var ngaybaocao = self.model.get("ngaybaocao");
							// 		//var url = "/export/excel/baocaongonhiembenhnhom";
									
							// 		if(!!ngaybaocao){
							// 			var url = "/export/excel/baocaotonghopnghingonhiembenhnhoma?ngaybaocao=" + ngaybaocao + "&cachly=1";
							// 			window.open(url, "_blank");
							// 		}
									
							// 	}
							// },
						],
						fields: [
							{
								field: "id", label: "ID", width: 100, readonly: true,visible:false
							},
							{field: "hoten", label: "Họ và tên", sortable: {order:"asc"},width: "150px"},
							{field: "namsinh", label: "Năm sinh"},
							{field: "quoctich", label: "Quốc tịch"},
							{ field: "noio", label: "Nơi ở tại Việt Nam (Nơi sẽ đến)"},
							{ field: "ngaygio_phathien", label: "Ngày giờ phát hiện"},
							{ field: "tiensu_trieuchunglamsang", label: "Tình trạng phát hiện", textField: "ten" },
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
							{ field: "tiensu_xutri", label: "Xử trí"},
						],

						dataSource: data.objects,
						primaryField:"id",
						selectionMode: "single",
						pagination: {
							// page: 1,
							pageSize: 20,
							showRowsInfo: true,
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