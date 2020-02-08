define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!tpl/BaoCaoNghiNgoNhiemBenh/baocaonghingonhiembenhmodel.html'),
		schema = require('json!app/view/BaoCaoNghiNgoNhiemBenh/BaoCaoNghiNgoNhiemBenhSchema.json');

	var XetNghiemItemView = require('app/view/BaoCaoNghiNgoNhiemBenh/XetNghiemItemView');
	var QuocGiaItemView = require('app/view/BaoCaoNghiNgoNhiemBenh/QuocGiaItemView');
	var VacXinItemView = require('app/view/BaoCaoNghiNgoNhiemBenh/VacXinItemView');
	var NguoiTiepXucItemView = require('app/view/BaoCaoNghiNgoNhiemBenh/NguoiTiepXucItemView');
	
	
	return Gonrin.ModelDialogView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "baocaonghingonhiembenh",
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
									Backbone.history.history.back();
					                // self.getApp().getRouter().navigate(self.collectionName + "/collection");
								}
							},
							{
				    	    	name: "save",
				    	    	type: "button",
				    	    	buttonClass: "btn-success btn-sm",
				    	    	label: "TRANSLATE:SAVE",
				    	    	command: function(){
				    	    		var self = this;
				    	    		if(!self.validate()){
				    	    			return;
				    	    		}
				                    self.model.save(null,{
				                        success: function (model, respose, options) {
				                            self.getApp().notify("Save successfully");
				                            self.getApp().getRouter().navigate(self.collectionName + "/collection");
				                        },
				                        error: function (model, xhr, options) {
				                            //self.alertMessage("Something went wrong while processing the model", false);
				                            self.getApp().notify('Save error');
				                        }
				                    });
				    	    	}
				    	    },
		    	    	]
		    	    },
		    	],
		uiControl: [
			{
				// field:"gioitinh",
				// uicontrol:"combobox",
				// textField: "text",
				// valueField: "value",
				// dataSource: [
				//         { text: "Nam", value: "nam" },
				//         { text: "Nữ", value: "nữ" },
				// ],

				field: "benh_nghingo",
				cssClass: false,

			},
			{field:"ngaybaocao", cssClass:false, textFormat :"DD/MM/YYYY", disabledComponentButton: true},
			{field:"ngay_nhapquacanh", cssClass:false, textFormat :"DD/MM/YYYY", disabledComponentButton: true},
            
			{
                field: "baocaonghingonhiembenhxetnghiem",
                uicontrol: false,
                itemView: XetNghiemItemView,
                tools: [{
                    name: "create",
                    type: "button",
                    buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
                    label: "<i class='fa fa-plus'></i>",
                    command: "create"
                }, ],
                toolEl: "#add-xetnghiem-item"
            },
            {
                field: "baocaonghingonhiembenhquocgia",
                uicontrol: false,
                itemView: QuocGiaItemView,
                tools: [{
                    name: "create",
                    type: "button",
                    buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
                    label: "<i class='fa fa-plus'></i>",
                    command: "create"
                }, ],
                toolEl: "#add-quocgia-item"
            },
            {
                field: "baocaonghingonhiembenhvacxin",
                uicontrol: false,
                itemView: VacXinItemView,
                tools: [{
                    name: "create",
                    type: "button",
                    buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
                    label: "<i class='fa fa-plus'></i>",
                    command: "create"
                }, ],
                toolEl: "#add-vacxin-item"
            },
            {
                field: "baocaonghingonhiembenhnguoitiepxuc",
                uicontrol: false,
                itemView: NguoiTiepXucItemView,
                tools: [{
                    name: "create",
                    type: "button",
                    buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
                    label: "<i class='fa fa-plus'></i>",
                    command: "create"
                }, ],
                toolEl: "#add-nguoitiepxuc-item"
            },
			{
				field: "cmtnd",
				cssClass: false,
			},
			{
				field: "cuakhau_nhapquacanh",
				cssClass: false,
			},
			{
				field: "diachi_lienlac",
				cssClass: false,
			},
			{
				field: "dienthoai",
				cssClass: false,
			},
			{
				field: "donvi",
				cssClass: false,
			},
			{
				field: "donvi_id",
				cssClass: false,
			},
			{
				field: "email",
				cssClass: false,
			},
			{
				field: "gio_nhapquacanh",
				cssClass: false,
			},
			{
				field: "gioitinh",
				cssClass: false,
			},
			{
				field: "hoten",
				cssClass: false,


			},
			{
				field: "id",
				cssClass: false,
			},
			{
				field: "ma",
				cssClass: false,
			},
			{
				field: "nambaocao",
				cssClass: false,

			},
			{
				field: "namsinh",
				cssClass: false,
			},
			{
				field: "ngay_nhapquacanh",
				cssClass: false,
			},
			
			{
				field: "nhanxet_danhgia",
				cssClass: false,
			},
			{
				field: "noibaocao",
				cssClass: false,
			},
			{
				field: "noio",
				cssClass: false,
			},
			{
				field: "noitiepnhan_xutri",
				cssClass: false,
			},
			{
				field: "phuongtien",
				cssClass: false,
			},
			{
				field: "quoctich",
				cssClass: false,
			},
			{
				field: "sohieu_phuongtien",
				cssClass: false,
			},
			{
				field: "tiensu_chandoan",
				cssClass: false,
			},
			{
				field: "tiensu_dichte",
				cssClass: false,
			},
			{
				field: "tiensu_ngaykhoiphat",
				cssClass: false,
			},
			{
				field: "tiensu_trieuchunglamsang",
				cssClass: false,
			},
			{
				field: "tiensu_xutri",
				cssClass: false,
			},
			{
				field: "tinhtrang",
				cssClass: false,
			},
		],
		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				//progresbar quay quay
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						console.log(data);
						var donvi = self.model.get("donvi");
						self.$el.find("#chuquan").html(donvi.coquanchuquan);
						self.$el.find("#tendonvi").html(donvi.ten);
						self.applyBindings();
						self.registerEvent();
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				//self.model.set("donvi_id")
				var user = self.getApp().currentUser;
				var donvi = user.info.donvi;
				self.model.set("donvi_id", donvi.id);
				self.$el.find("#chuquan").html(donvi.coquanchuquan);
				self.$el.find("#tendonvi").html(donvi.ten);
				self.applyBindings();
				self.registerEvent();
			}

		},
		registerEvent: function(){
			var self = this;
			self.model.on("change:ngaybaocao", function(){
				var ngaybaocao = self.model.get("ngaybaocao");
				
				var moobject = moment(ngaybaocao, "YYYY-MM-DDTHH:mm:ss");
				var nambaocao = moobject.year();
				console.log(nambaocao);
				self.model.set("nambaocao", nambaocao);
			})
		},
		validate: function(){
			var self = this;
			var nam = self.model.get("nambaocao");
			if(!nam){
				self.getApp().notify('Chưa điền năm báo cáo');
				return false;
			}
			
			return true;
		}
	});

});