define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');

	var template = require('text!app/view/tokhaiyte/tpl/model.html'),
		schema = require('json!app/view/tokhaiyte/ToKhaiYTeSchema.json');


	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tokhaiyte",
		tools: [
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
						command: function () {
							var self = this;
							//Backbone.history.history.back();
							self.getApp().getRouter().navigate(self.collectionName + "/collection");
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:SAVE",
						command: function () {
							var self = this;
							// self.model.set('id', '1áds23')
							self.model.set('donvi_id', 1)
							self.model.set('cuakhau_id', 1)
							self.model.set('canbo_id', 1)


							self.model.save(null, {
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
					{
						name: "delete",
						type: "button",
						buttonClass: "btn-danger btn-sm",
						label: "TRANSLATE:DELETE",
						visible: function () {
							return this.getApp().getRouter().getParam("id") !== null;
						},
						command: function () {
							var self = this;
							self.model.destroy({
								success: function (model, response) {
									self.getApp().notify('Delete successfully');

									self.getApp().getRouter().navigate(self.collectionName + "/collection");
								},
								error: function (model, xhr, options) {
									//self.alertMessage("Something went wrong while processing the model", false);
									self.getApp().notify('Delete error');
								}
							});
						}
					},
				]
			},
		],
		uiControl: [
			// {
			// 	field:"gioitinh",
			// 	uicontrol:"combobox",
			// 	textField: "text",
			// 	valueField: "value",
			// 	dataSource: [
			// 	        { text: "Nam", value: "nam" },
			// 	        { text: "Nữ", value: "nữ" },
			// 	],
			// },
			{ field: "ngaybaocao", cssClass: false, textFormat: "DD/MM/YYYY", disabledComponentButton: true },
			{ field: "ngay_nhapquacanh", cssClass: false, textFormat: "DD/MM/YYYY", disabledComponentButton: true },

			{
				field: "thongtindilai_taubay",
				uicontrol: "checkbox",
				checkedField: "name",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: true, id: 1, cssClass: "yeallow" },
					{ name: false, id: 5 },
				],
				value: 1
			},
			{
				field: "thongtindilai_tauthuyen",
				uicontrol: "checkbox",
				checkedField: "name",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: true, id: 1, cssClass: "yeallow" },
					{ name: false, id: 5 },
				],
				value: 1
			},
			{
				field: "thongtindilai_oto",
				uicontrol: "checkbox",
				checkedField: "name",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: true, id: 1, cssClass: "yeallow" },
					{ name: false, id: 5 },
				],
				value: 1
			},

			{
				field: "dauhieubenh_khotho",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 2 },
				],
			},
			{
				field: "dauhieubenh_dauhong",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 2 },
				],
			},
			{
				field: "dauhieubenh_buonnon",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 2 },
				],
			},
			{
				field: "dauhieubenh_tieuchay",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 2 },
				],
			},
			{
				field: "dauhieubenh_xuathuyetngoaida",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 2 },
				],
			},
			{
				field: "dauhieubenh_phatban",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 2 },
				],
			},
			{
				field: "tiepxuc_dongvat",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "Có", id: 1 },
					{ name: "Không", id: 2 },
				],
			},
			{
				field: "chamsocnguoibenhtruyennhiem",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "Có", id: 1 },
					{ name: "Không", id: 2 },
				],
			},
			{
				field: "dauhieubenh_sot",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 2 },
				],
			},
			{
				field: "dauhieubenh_ho",
				textField: "name",
				uicontrol: "radio",
				valueField: "id",
				cssClassField: "cssClass",
				dataSource: [
					{ name: "", id: 1 },
					{ name: "", id: 2 },
				],
			},
			// {
			// 	field: "baocaonghingonhiembenhquocgia",
			// 	uicontrol: false,
			// 	itemView: QuocGiaItemView,
			// 	tools: [{
			// 		name: "create",
			// 		type: "button",
			// 		buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
			// 		label: "<i class='fa fa-plus'></i>",
			// 		command: "create"
			// 	},],
			// 	toolEl: "#add-quocgia-item"
			// },
			// {
			// 	field: "baocaonghingonhiembenhvacxin",
			// 	uicontrol: false,
			// 	itemView: VacXinItemView,
			// 	tools: [{
			// 		name: "create",
			// 		type: "button",
			// 		buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
			// 		label: "<i class='fa fa-plus'></i>",
			// 		command: "create"
			// 	},],
			// 	toolEl: "#add-vacxin-item"
			// },
			// {
			// 	field: "baocaonghingonhiembenhnguoitiepxuc",
			// 	uicontrol: false,
			// 	itemView: NguoiTiepXucItemView,
			// 	tools: [{
			// 		name: "create",
			// 		type: "button",
			// 		buttonClass: "btn btn-outline-secondary btn-fw btn-sm create-item",
			// 		label: "<i class='fa fa-plus'></i>",
			// 		command: "create"
			// 	},],
			// 	toolEl: "#add-nguoitiepxuc-item"
			// },
			{
				field: "cmtnd",
				cssClass: false,


			},
			{
				field: "vacxin_dasudung",
				cssClass: false,


			},
			{
				field: "diachi_lienlac",
				cssClass: false,


			},
			{
				field: "sodienthoai",
				cssClass: false,


			},
			{
				field: "quocgiadiqua",
				cssClass: false,


			},
			{
				field: "noi_khoihanh",
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
				field: "noiden",
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
				field: "soghe_phuongtien",
				cssClass: false,


			},
			{
				field: "sohieu_phuongtien",
				cssClass: false,


			},

			{
				field: "sohochieu",
				cssClass: false,


			},
			{
				field: "namsinh",
				cssClass: false,


			},
			{
				field: "ngay_khoihanh",
				cssClass: false,


			},
			{
				field: "ngay_nhapcanh",
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
				field: "diachi_taivietnam",
				cssClass: false,


			},
			{
				field: "thongtindilai_chitiet",
				cssClass: false,


			},
		],
		render: function () {
			var self = this;
			console.log(self.getApp().currentUser)

			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				
				this.model.set('id', id);
				this.model.fetch({
					success: function (data) {
						self.applyBindings();
						self.$el.find('.checkbox-group').css({ 'width': '11%', 'margin-left': '2px' });
						self.$el.find('.input-group-addon').hide();
						self.$el.find('.datetimepicker-input').css('padding', '5px');
						self.$el.find('.checkbox-group,.checkbox-group2').css('float', 'left');
						self.$el.find('.radio-option').css({ 'display': 'inline', 'padding-left': '30px', 'padding-right': '30px' });
					},
					error: function () {
						self.getApp().notify("Get data Eror");
					},
				});
			} else {
				self.applyBindings();
			}
			self.$el.find('.checkbox-group').css({ 'width': '11%', 'margin-left': '2px' });
			self.$el.find('.input-group-addon').hide();
			self.$el.find('.datetimepicker-input').css('padding', '5px');
			self.$el.find('.checkbox-group,.checkbox-group2').css('float', 'left');
			self.$el.find('.radio-option').css({ 'display': 'inline', 'padding-left': '30px', 'padding-right': '30px' });

		},
	});

});