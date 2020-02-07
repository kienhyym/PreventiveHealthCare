define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		
		{
			"collectionName": "baocaonghingonhiembenh",
			"route": "baocaonghingonhiembenh/collection",
			"$ref": "app/baocaonghingonhiembenh/js/BaoCaoNghiNgoNhiemBenhCollectionlView",
		},
		{
			"collectionName": "baocaonghingonhiembenh",
			"route": "baocaonghingonhiembenh/model(/:id)",
			"$ref": "app/baocaonghingonhiembenh/js/BaoCaoNghiNgoNhiemBenhModelView",
		},
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
		
	];
});
