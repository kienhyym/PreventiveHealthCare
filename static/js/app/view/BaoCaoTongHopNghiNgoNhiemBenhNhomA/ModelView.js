define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/tpl/model.html'),
		schema = require('json!app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/Schema.json');

    var NguoiNghiNhiemView = require('app/view/BaoCaoTongHopNghiNgoNhiemBenhNhomA/DanhSachNghiNgoCollection');
	var BaoCaoNghiNgoNhiemBenhDialogView = require('app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhDialogView');
	
	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaotonghopnghingonhiembenhnhomA",
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
					                self.getApp().getRouter().navigate("baocaotonghopnghingonhiembenhnhoma/collection");
								}
							},
							{
				    	    	name: "save",
				    	    	type: "button",
				    	    	buttonClass: "btn-success btn-sm",
				    	    	label: "TRANSLATE:SAVE",
				    	    	command: function(){
                                    var self = this;
				                    self.model.save(null,{
				                        success: function (model, respose, options) {
				                            self.getApp().notify("Save successfully");
				                            self.getApp().getRouter().navigate("baocaotonghopnghingonhiembenhnhoma/collection");
				                        },
				                        error: function (model, xhr, options) {
				                            self.getApp().notify('Save error');
				                        }
				                    });
				    	    	}
							}
		    	    	]
					},
					{
						name : "exportgr",
						type : "group",
						groupClass : "toolbar-group",
						buttons : [ {
							name : "excel",
							type : "button",
							buttonClass : "btn-default btn-sm btn-primary",
							label : "Xuất Excel",
							command : function() {
								var id = this.model.get("id"); 
								var url = "/export/excel/baocaotonghopnghingonhiembenhnhoma/" + id;
								 window.open(url, "_blank");
							},
							visible: function(){
								var id =  this.getApp().getRouter().getParam("id");
								console.log(id, id !== null, "visible");
								return (id !== null);
								// return true;
							}
						}]
					},
		    	],
		uiControl: [
			{field:"ngaybaocao",  textFormat :"DD/MM/YYYY", disabledComponentButton: false},
			{
				field:"loaibaocao",
				uicontrol:"combobox",
				textField: "text",
				valueField: "value",
				cssClass:"form-control",
				dataSource: [
					{ value: 1, text: "Đơn vị" },
					{ value: 2, text: "Cửa khẩu" },
				 ],
			},
		],
		render: function () {
            var self = this;
            var user = self.getApp().currentUser;
            self.$el.find(".duonghangkhong").hide();
			self.$el.find(".loaibaocao").hide();
            if (user) {
                var id = this.getApp().getRouter().getParam("id");
                if (id) {
                    this.model.set('id', id);
                    this.model.fetch({
                        success: function (data) {
                            var info = user.info;
                            var cuakhau = info.cuakhau;
                            if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
                                if (cuakhau.duonghangkhong == true) {
                                    self.$el.find(".duonghangkhong").show();
                                }
							}
                            self.applyBindings();
							self.registerEvent();
							self.getDanhsachnhiembenh();
                        },
                        error: function () {
                            self.getApp().notify("Get data Eror");
                        },
                    });
                } else {
					
					// console.log
					//self.model.set("ngaybaocao", moment().startOf('day').unix());

					//self.model.set("ngaybaocao", moment().startOf('day').format("YYYY-MM-DDTHH:mm"));
					self.model.on("change:ngaybaocao",function () {
						var ngaybaocao = self.model.get("ngaybaocao");
						self.getDanhsachnhiembenh(ngaybaocao);
					})
					self.model.set({"ngaybaocao": moment().startOf('day').format("YYYY-MM-DD"),"loaibaocao":2});
					
                    self.applyBindings();
					self.registerEvent();
					
					var info = user.info;
                    var cuakhau = info.cuakhau;
                    if ( !!cuakhau && cuakhau !== null && cuakhau !== "" && cuakhau !== undefined) {
                        self.model.set({"cuakhau_id":cuakhau.id,"tencuakhau":cuakhau.ten,"macuakhau":cuakhau.ma});
                        if (cuakhau.duonghangkhong == true) {
                            self.$el.find(".duonghangkhong").show();
                        }
                    }
                    var donvi = info.donvi;
                    if ( !!donvi && donvi !== null && donvi !== "" && donvi !== undefined) {
                        self.model.set({"donvi_id":donvi.id,"tendonvi":donvi.ten})
                    }
                }
            }
		},
		checkRole: function(role) {
			var ret = gonrinApp().currentUser != null ? gonrinApp().currentUser.hasRole(role): false;
			return ret;
		},
		registerEvent: function(){
			var self = this;
			if (self.checkRole("Admin")) {
				self.model.set("loaibaocao",2);
				self.$el.find(".user_donvi").hide();
				self.$el.find(".user_cuakhau").show();
				self.$el.find(".loaibaocao").show();
			}
			else if (self.checkRole("CuaKhauUser")) {
				self.model.set("loaibaocao",2);
				self.$el.find(".user_donvi").hide();
				self.$el.find(".user_cuakhau").show();
			} else if(self.checkRole("DonViUser") || self.checkRole("DonViAdmin")) {
				
				self.model.set("loaibaocao",1);
				self.$el.find(".user_donvi").show();
				self.$el.find(".user_cuakhau").hide();
			}
			self.model.on("change:loaibaocao", function() {
				var loaibaocao = self.model.get("loaibaocao");
				if (loaibaocao == 1) {
					self.$el.find(".user_donvi").show();
					self.$el.find(".user_cuakhau").hide();
				} else {
					self.$el.find(".user_donvi").hide();
					self.$el.find(".user_cuakhau").show();
				}
			});
		},
		validate: function() {
			var self = this;
			var ngaybaocao = self.model.get("ngaybaocao");
			if(!ngaybaocao) {
				self.getApp().notify('Vui lòng điền ngày báo cáo');
				return false;
			}
			return true;
		},
		createNguoiNhiemBenh: function(ngaybaocao) {
			var self = this;
			var dialogNghiNgonhiemBenh = new BaoCaoNghiNgoNhiemBenhDialogView();
			dialogNghiNgonhiemBenh.dialog({size: "large"});
			dialogNghiNgonhiemBenh.on("close", function () {
				self.getDanhsachnhiembenh(ngaybaocao);
			});
		},
		getDanhsachnhiembenh:function(ngaybaocao){
			var self = this;
				$("#add-nghingonhiembenh-item").html("");
				var url_danhsachnghingo = self.getApp().serviceURL + '/api/v1/baocaonghingonhiembenh';
				$.ajax({
				url: url_danhsachnghingo,
					method: "GET",
		    		data: {"q": JSON.stringify({"filters": {"ngaybaocao":{"$eq":ngaybaocao}},"page":1}),"results_per_page":50},
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
										
										self.createNguoiNhiemBenh(ngaybaocao);
										// var dialogNghiNgonhiemBenh = new BaoCaoNghiNgoNhiemBenhDialogView();
										// dialogNghiNgonhiemBenh.dialog({size: "large"});
										
									}
								},
							],
		                	fields: [
								{
									field: "id", label: "ID", width: 100, readonly: true,
								},
								{field: "hoten", label: "Họ và tên", sortable: {order:"asc"},width: 400},
								{field: "dienthoai", label: "Số điện thoại", width: 200},
								{ field: "ngaybaocao", label: "Ngày báo cáo", width: 250 },
								{ field: "noibaocao", label: "Nơi báo cáo", width: 250 },
								{ field: "donvi", label: "Tên đơn vị", width: 250, textField: "ten" },
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