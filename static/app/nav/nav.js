define(function (require) {
	"use strict";
	var $ = require('jquery'),
		_ = require('underscore'),
		Gonrin = require('gonrin');
	return [
		// {
		// 	"text": "Báo cáo tổng hợp nghi ngờ nhiễm bệnh",
		// 	"icon": "fa fa-calendar",
		// 	"type": "view",
		// 	"collectionName": "baocaotonghopnghingonhiembenhnhoma",
		// 	"route": "baocaotonghopnghingonhiembenhnhoma/collection",
		// 	"$ref": "app/baocaotonghopnghingonhiembenhnhoma/view/ModelView",
		// 	"visible": function () {
		// 		return true
		// 	}
		// },
		
		{
			"text": "Tờ khai y tế đối với người",
			"icon": "fa fa-angle-double-right",
			"type": "view",
			"collectionName": "tokhaiytedoivoinguoi",
			"route": "tokhaiytedoivoinguoi/collection",
			"$ref": "app/tokhaiytedoivoinguoi/js/CollectionView",
			"visible": function () {
				return true

			}
		},
		{
			"type": "view",
			"collectionName": "tokhaiytedoivoinguoi",
			"route": "tokhaiytedoivoinguoi/model",
			"$ref": "app/tokhaiytedoivoinguoi/js/ModelView",
			"visible": function () {
				return false;
			}
		},
	];
});
