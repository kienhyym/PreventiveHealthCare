// define(function (require) {
// 	"use strict";
// 	var $ = require('jquery'),
// 		_ = require('underscore'),
// 		Gonrin = require('gonrin');

// 	var template = require('text!tpl/BaoCao/nghingonguoibenh.html'),
// 		schema = require('json!app/view/BaoCao/BaoCaoNghiNgoNguoiBenhSchema.json');


// 	return Gonrin.ModelView.extend({
// 		template: template,
// 		modelSchema: schema,
// 		urlPrefix: "/api/v1/",
// 		collectionName: "baocaonghingonhiembenh",
// 		//tools:null,
// 		uiControl: [
// 			{
// 				// field:"gioitinh",
// 				// uicontrol:"combobox",
// 				// textField: "text",
// 				// valueField: "value",
// 				// dataSource: [
// 				//         { text: "Nam", value: "nam" },
// 				//         { text: "Nữ", value: "nữ" },
// 				// ],

// 				field: "benh_nghingo",
// 				cssClass: false,

// 			},
// 			{
// 				field: "cmtnd",
// 				cssClass: false,


// 			},
// 			{
// 				field: "cuakhau_nhapquacanh",
// 				cssClass: false,


// 			},
// 			{
// 				field: "diachi_lienlac",
// 				cssClass: false,


// 			},
// 			{
// 				field: "dienthoai",
// 				cssClass: false,


// 			},
// 			{
// 				field: "donvi",
// 				cssClass: false,


// 			},
// 			{
// 				field: "donvi_id",
// 				cssClass: false,


// 			},
// 			{
// 				field: "email",
// 				cssClass: false,


// 			},
// 			{
// 				field: "gio_nhapquacanh",
// 				cssClass: false,


// 			},
// 			{
// 				field: "gioitinh",
// 				cssClass: false,

// 			},
// 			{
// 				field: "hoten",
// 				cssClass: false,


// 			},
// 			{
// 				field: "id",
// 				cssClass: false,

// 			},
// 			{
// 				field: "ma",
// 				cssClass: false,


// 			},
// 			{
// 				field: "nambaocao",
// 				cssClass: false,

// 			},
// 			{
// 				field: "namsinh",
// 				cssClass: false,


// 			},
// 			{
// 				field: "ngay_nhapquacanh",
// 				cssClass: false,


// 			},
// 			{
// 				field: "ngaybaocao",
// 				cssClass: false,


// 			},
// 			{
// 				field: "nhanxet_danhgia",
// 				cssClass: false,


// 			},
// 			{
// 				field: "noibaocao",
// 				cssClass: false,


// 			},
// 			{
// 				field: "noio",
// 				cssClass: false,


// 			},
// 			{
// 				field: "noitiepnhan_xutri",
// 				cssClass: false,


// 			},
// 			{
// 				field: "phuongtien",
// 				cssClass: false,


// 			},
// 			{
// 				field: "quoctich",
// 				cssClass: false,


// 			},
// 			{
// 				field: "sohieu_phuongtien",
// 				cssClass: false,


// 			},
// 			{
// 				field: "tiensu_chandoan",
// 				cssClass: false,


// 			},
// 			{
// 				field: "tiensu_dichte",
// 				cssClass: false,

// 			},
// 			{
// 				field: "tiensu_ngaykhoiphat",
// 				cssClass: false,


// 			},
// 			{
// 				field: "tiensu_trieuchunglamsang",
// 				cssClass: false,


// 			},
// 			{
// 				field: "tiensu_xutri",
// 				cssClass: false,


// 			},
// 		],
// 		render: function () {
// 			var self = this;
// 			var id = this.getApp().getRouter().getParam("id");
// 			if (id) {
// 				//progresbar quay quay
// 				this.model.set('id', id);
// 				this.model.fetch({
// 					success: function (data) {

// 						self.applyBindings();
// 					},
// 					error: function () {
// 						self.getApp().notify("Get data Eror");
// 					},
// 				});
// 			} else {
// 				self.applyBindings();
// 			}

// 		},

// 	});

// });