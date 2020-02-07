define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		{
			"text": "Index",
			"type": "view",
			"collectionName": "index",
			"route": "index",
			"$ref": "app/bases/IndexView",
			"visible": false
		},
		{
			"text": "Báo cáo cửa khẩu",
			"icon": static_url + "/images/icons/task_120.png",
			"type": "category",
			"entries": [
				{
					"text": "Tổng hợp nghi ngờ nhiễm bệnh",
					"icon": "fa fa-calendar",
					"type": "view",
					"collectionName": "baocaotonghopnghingonhiembenhnhoma",
					"route": "baocaotonghopnghingonhiembenhnhomack/collection",
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
				}

			]
		},
		{
			"text": "Báo cáo đơn vị",
			"icon": static_url + "/images/icons/task_120.png",
			"type": "category",
			"entries": [
				{
					"text": "Tổng hợp nghi ngờ nhiễm bệnh",
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
					"text": "Báo cáo nghi ngờ nhiễm bệnh",
					"icon": "fa fa-angle-double-right",
					"type": "view",
					"collectionName": "baocaonghingonhiembenh",
					"route": "baocaonghingonhiembenh/collection",
					"$ref": "app/baocaonghingonhiembenh/js/BaoCaoNghiNgoNhiemBenhCollectionlView",
					"visible": function () {
						return true
					}
				}

			]
		},

	];
});