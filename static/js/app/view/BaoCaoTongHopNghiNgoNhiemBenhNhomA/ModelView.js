define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/tpl/model.html'),
		schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/Schema.json');

    var BaoCaoNghiNgoNhiemBenhDialogView = require('app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhDialogView');
	var CuaKhauSelectView = require('app/view/HeThong/CuaKhau/SelectView');

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



                                    // var self = this;
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

			// {
			// 	field:"loaibaocao",
			// 	uicontrol:"combobox",
			// 	textField: "text",
			// 	valueField: "value",
			// 	cssClass:"form-control",
			// 	dataSource: [
			// 		{ value: 1, text: "Đơn vị" },
			// 		{ value: 2, text: "Cửa khẩu" },
			// 	 ],
			// },
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
				self.getData();
				
				
                
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
				self.getData();
			})
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
            self.model.set("songuoinguoinghingo", null);

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











		// validate: function() {
		// 	var self = this;
		// 	var ngaybaocao = self.model.get("ngaybaocao");
		// 	if(!ngaybaocao) {
		// 		self.getApp().notify('Vui lòng điền ngày báo cáo');
		// 		return false;
		// 	}
		// 	return true;
		// },





		createNguoiNhiemBenh: function() {
			var self = this;
			
			var dialogNghiNgonhiemBenh = new BaoCaoNghiNgoNhiemBenhDialogView();
			dialogNghiNgonhiemBenh.dialog({size: "large"});
			dialogNghiNgonhiemBenh.on("close", function (param) {
				console.log("dialogNghiNgonhiemBenh close", param);
				if ((!!param) && (param.refresh)){
					
					self.getDanhsachnhiembenh();
				}
				
			});
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
					$("#add-nghingonhiembenh-item").grid({
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
								label: "Tạo mới nhanh trường hợp nghi ngờ",
								command: function() {
									self.createNguoiNhiemBenh();
								}
							},
							{
								name: "export_excel",
								type: "button",
								buttonClass: "btn-primary btn-sm",
								label: "Xuất Excel danh sách",
								command: function() {
									var ngaybaocao = self.model.get("ngaybaocao");
									var url = "/export/excel/baocaotonghopnghingonhiembenhnhoma";
									
									if(!!ngaybaocao){
										url = "/export/excel/baocaotonghopnghingonhiembenhnhoma?ngaybaocao=" + ngaybaocao;
									}
									window.open(url, "_blank");
								}
							},
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
							{ field: "tiensu_xutri", label: "Xử trí", width: 250 },
						],
						dataSource: data.objects,
						primaryField:"id",
						selectionMode: "single",
						pagination: {
						page: 1,
						pageSize: 20
						},
						onRowClick: function(event){
							if (event.rowId) {
								var path =  'baocaonghingonhiembenh/model/model?id=' + event.rowId;
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