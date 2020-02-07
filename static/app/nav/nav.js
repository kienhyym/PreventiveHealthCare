define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [

		{
			"text": "Báo cáo tổng hợp nghi ngờ nhiễm bệnh",
			"icon": "fa fa-calendar",
			"type": "view",
			"collectionName": "baocaotonghopnghingonhiembenhnhoma",
			"route": "baocaotonghopnghingonhiembenhnhoma/collection",
			"$ref": "app/baocaotonghopnghingonhiembenhnhoma/view/ModelView",
			"visible": function () {
				return true

			}
		},
		{
			"text": "Tờ khai y tế đối với người",
			"icon": "fa fa-book",
			"type": "view",
			"collectionName": "chitietthietbi",
			"route": "tokhaiyte/collection",
			"$ref": "app/tokhaiyte/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		


	];

});


