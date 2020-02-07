define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		{
			"text": "Chi tiết Báo cáo tổng hợp nghi ngờ nhiễm bệnh",
			"icon": "fa fa-calendar",
			"type": "view",
			"collectionName": "baocaotonghopnghingonhiembenh",
			"route": "baocaotonghopnghingonhiembenh/collection",
			"$ref": "app/view/BaoCaoTongHopNghiNgoNhiemBenh/ModelView",
			"visible": function () {
				return false;
			}
		},
		{
			"text": "Báo cáo tổng hợp nghi ngờ nhiễm bệnh",
			"icon": "fa fa-calendar",
			"type": "view",
			"collectionName": "baocaotonghopnghingonhiembenhnhoma",
			"route": "baocaotonghopnghingonhiembenhnhoma/collection",
			"$ref": "app/view/BaoCaoTongHopNghiNgoNhiemBenh/ModelView",
			"visible": function () {
				return true
			}
		},
		
		{
			"text": "Tờ khai y tế đối với người",
			"icon": "fa fa-angle-double-right",
			"type": "view",
			"collectionName": "baocaonghingonhiembenh",
			"route": "baocaonghingonhiembenh/collection",
			"$ref": "app/baocaonghingonhiembenh/js/BaoCaoNghiNgoNhiemBenhCollectionlView",
			"visible": function () {
				return true
			}
		},
		{
			"type": "view",
			"collectionName": "baocaonghingonhiembenh",
			"route": "baocaonghingonhiembenh/model",
			"$ref": "app/baocaonghingonhiembenh/js/BaoCaoNghiNgoNhiemBenhModelView",
			"visible": function () {
				return false;
			}
		},
	];
});