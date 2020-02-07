define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	var template = require('text!app/tokhaiytedoivoinguoi/tpl/model.html'),
		schema = require('json!schema/ToKhaiYTeDoiVoiNguoiSchema.json');



	return Gonrin.ModelView.extend({
		template: template,
		modelSchema: schema,
		urlPrefix: "/api/v1/",
		collectionName: "tokhaiytedoivoinguoi",
		bindings: "data-bind",
		state: null,
		tools: [
			{
				name: "defaultgr",
				type: "group",
				groupClass: "toolbar-group",
				buttons: [
					{
						name: "back",
						type: "button",
						buttonClass: "btn-default btn-sm btn-secondary",
						label: "TRANSLATE:Quay lại",
						command: function () {
							var self = this;
							Backbone.history.history.back();
						}
					},
					{
						name: "save",
						type: "button",
						buttonClass: "btn-success btn-sm",
						label: "TRANSLATE:Lưu",
						command: function () {
							var self = this;

							if (self.model.get("trangthai") == null) {
								self.getApp().notify({ message: "Bạn chưa cập nhật trạng thái thiết bị" }, { type: "danger", delay: 1000 });

								return false;
							}
							else {
								self.model.save(null, {
									success: function (model, respose, options) {

										self.getApp().notify("Lưu thông tin thành công");
										self.getApp().getRouter().navigate(self.collectionName + "/collection");
									},
									error: function (xhr, status, error) {
										try {
											if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
												self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
												self.getApp().getRouter().navigate("login");
											} else {
												self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
											}
										}
										catch (err) {
											self.getApp().notify({ message: "Lưu thông tin không thành công" }, { type: "danger", delay: 1000 });
										}
									}
								});
							}



						}
					},
					{
						name: "delete",
						type: "button",
						buttonClass: "btn-danger btn-sm",
						label: "TRANSLATE:Xóa",
						visible: function () {
							return this.getApp().getRouter().getParam("id") !== null;
						},
						command: function () {
							var self = this;
							self.model.destroy({
								success: function (model, response) {
									self.getApp().notify('Xoá dữ liệu thành công');
									self.getApp().getRouter().navigate(self.collectionName + "/collection");
								},
								error: function (xhr, status, error) {
									try {
										if (($.parseJSON(error.xhr.responseText).error_code) === "SESSION_EXPIRED") {
											self.getApp().notify("Hết phiên làm việc, vui lòng đăng nhập lại!");
											self.getApp().getRouter().navigate("login");
										} else {
											self.getApp().notify({ message: $.parseJSON(error.xhr.responseText).error_message }, { type: "danger", delay: 1000 });
										}
									}
									catch (err) {
										self.getApp().notify({ message: "Xóa dữ liệu không thành công" }, { type: "danger", delay: 1000 });
									}
								}
							});
						}
					},
					// {
					// 	name: "taophieu",
					// 	type: "button",
					// 	buttonClass: "btn-info btn-sm",
					// 	label: "TRANSLATE:Tạo Phiếu",
					// 	command: function () {
					// 		var self = this;
					// 		location.href = self.getApp().serviceURL + "/?#bangkiemtrathietbi/model";
					// 		sessionStorage.setItem('TenThietBi', self.model.get("tenthietbi"));
					// 		sessionStorage.setItem('IDThietBi', self.model.get("id"));
					// 		sessionStorage.setItem('SerialThietBi', self.model.get("model_serial_number"));
					// 		sessionStorage.setItem('MaQLTBThietBi', self.model.get("ma_qltb"));
					// 	}
					// },
				],
			}],
		uiControl: {
			fields: [

				// {
				// 	field: "phanloai",
				// 	uicontrol: "combobox",
				// 	textField: "text",
				// 	valueField: "value",
				// 	dataSource: [
				// 		{ "value": "A", "text": "Loại A (mức độ rủi ro thấp.)" },
				// 		{ "value": "B", "text": "Loại B (mức độ rủi ro trung bình thấp.)" },
				// 		{ "value": "C", "text": "Loại C (mức độ rủi ro trung bình cao.)" },
				// 		{ "value": "D", "text": "Loại D (mức độ rủi ro cao.)" },
				// 	],
				// },
				// {
				// 	field: "trangthai",
				// 	uicontrol: "combobox",
				// 	textField: "text",
				// 	valueField: "value",
				// 	dataSource: [
				// 		{ "value": "yeucaukiemtrathietbi", "text": "Đang yêu cầu kiểm tra" },
				// 		{ "value": "dangsuachua", "text": "Đang sửa chữa" },
				// 		{ "value": "dangchokiemduyet", "text": "Đang chờ kiểm duyệt" },
				// 		{ "value": "dakiemduyet", "text": "Đã kiểm duyệt" },
				// 		{ "value": "luukho", "text": "Lưu kho chưa vận hành" },

				// 	],
				// },

				// {
				// 	field: "ngaymua",
				// 	uicontrol: "datetimepicker",
				// 	textFormat: "DD/MM/YYYY",
				// 	extraFormats: ["DDMMYYYY"],
				// 	parseInputDate: function (val) {
				// 		return moment.unix(val)
				// 	},
				// 	parseOutputDate: function (date) {
				// 		return date.unix()
				// 	}
				// },
				// {
				// 	field: "baohanhtungay",
				// 	uicontrol: "datetimepicker",
				// 	textFormat: "DD/MM/YYYY",
				// 	extraFormats: ["DDMMYYYY"],
				// 	parseInputDate: function (val) {
				// 		return moment.unix(val)
				// 	},
				// 	parseOutputDate: function (date) {
				// 		return date.unix()
				// 	}
				// },
				// {
				// 	field: "baohanhdenngay",
				// 	uicontrol: "datetimepicker",
				// 	textFormat: "DD/MM/YYYY",
				// 	extraFormats: ["DDMMYYYY"],
				// 	parseInputDate: function (val) {
				// 		return moment.unix(val)
				// 	},
				// 	parseOutputDate: function (date) {
				// 		return date.unix()
				// 	}
				// },
				// {
				// 	field: "ngaynhap",
				// 	uicontrol: "datetimepicker",
				// 	textFormat: "DD/MM/YYYY",
				// 	extraFormats: ["DDMMYYYY"],
				// 	parseInputDate: function (val) {
				// 		return moment.unix(val)
				// 	},
				// 	parseOutputDate: function (date) {
				// 		return date.unix()
				// 	}
				// },
				// {
				// 	field: "nhacungcap",
				// 	uicontrol: "ref",
				// 	textField: "ten",
				// 	foreignRemoteField: "id",
				// 	foreignField: "nhacungcap_id",
				// 	dataSource: NhaCungCapSelectView
				// },
				// {
				// 	field: "hangsanxuat",
				// 	uicontrol: "ref",
				// 	textField: "ten",
				// 	foreignRemoteField: "id",
				// 	foreignField: "hangsanxuat_id",
				// 	dataSource: HangSanXuatSelectView
				// },
				// {
				// 	field: "quocgia",
				// 	uicontrol: "ref",
				// 	textField: "ten",
				// 	foreignRemoteField: "id",
				// 	foreignField: "quocgia_id",
				// 	dataSource: NoisanXuatCapSelectView
				// },
				// {
				// 	field: "phong",
				// 	uicontrol: "ref",
				// 	textField: "ten",
				// 	foreignRemoteField: "id",
				// 	foreignField: "phong_id",
				// 	dataSource: PhongSelectView
				// },
				// {
				// 	field: "khoa",
				// 	uicontrol: "ref",
				// 	textField: "ten",
				// 	foreignRemoteField: "id",
				// 	foreignField: "khoa_id",
				// 	dataSource: KhoaSelectView
				// },
				// {
				// 	field: "tinhtrangthietbikhimua",
				// 	uicontrol: "radio",
				// 	textField: "text",
				// 	valueField: "value",
				// 	cssClassField: "cssClass",
				// 	dataSource: [
				// 		{ text: "-Mới 100%", value: "moi" },
				// 		{ text: "- Thiết bị cũ:", value: "cu" },
				// 	],
				// },
				// {
				// 	field: "yeucauvebaoduong",
				// 	uicontrol: "radio",
				// 	textField: "text",
				// 	valueField: "value",
				// 	cssClassField: "cssClass",
				// 	dataSource: [
				// 		{ text: "- Không cần bảo dưỡng:", value: "Không cần bảo dưỡng" },
				// 		{ text: "- Bảo dưỡng, chu kỳ:", value: "Bảo dưỡng" },
				// 	],
				// },
				// {
				// 	field: "hetbaohanh",

				// 	uicontrol: "checkbox",
				// 	checkedField: "key",
				// 	valueField: "value",
				// 	dataSource: [{
				// 		"value": "hetbaohanh",
				// 		"key": true
				// 	},
				// 	{
				// 		"value": null,
				// 		"key": false
				// 	},
				// 	],
				// },
			]
		},

		render: function () {
			var self = this;
			var id = this.getApp().getRouter().getParam("id");
			if (id) {
				this.model.set('id', id);
				this.model.fetch({
				
				
				});
			} else {
				self.applyBindings();
			}
		},


		
	});
});