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
			"collectionName": "tokhaiyte",
			"route": "tokhaiyte/collection",
			"$ref": "app/tokhaiyte/js/CollectionView",
			"visible": function () {
				return true
			}
		},
		{
			"type": "view",
			"collectionName": "tokhaiyte",
			"route": "tokhaiyte/model",
			"$ref": "app/tokhaiyte/js/ModelView",
			"visible": function () {
				return false;
			}
		},
	];
});